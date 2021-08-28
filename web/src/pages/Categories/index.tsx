import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

import api from '../../services/api';

import { RiCloseCircleFill } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Body } from '../../components/Styles/Body';
import { Title } from '../../components/Styles/Title';
import {
  Container,
  ContainerHeader,
  SearchContainer,
  ButtonNew,
  TableContainer,
  Thead,
  Tbody,
  ButtonDelete,
  ButtonEdit,
} from './styles';

interface Category {
  id: string;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const getCategories = useCallback(() => {
    api.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const searchCategories = useCallback(
    (value: string) => {
      const filtercategories = categories.filter(category => category.name.indexOf(value) !== -1);

      setCategories(filtercategories);
    },
    [categories],
  );

  const handleSearchInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      return value === '' ? getCategories() : searchCategories(value);
    },
    [getCategories, searchCategories],
  );

  function deleteSuccess() {
    toast.success('Categoria deletada com sucesso');
  }

  function deleteError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao deletar a categoria.', 'error');
  }

  async function deleteCategory(id: string) {
    try {
      const alert = window.confirm("Deseja excluir a categoria?")

      if (alert) {
        await api.delete(`/categories/${id}`);
        const updateCategories = categories.filter(category => category.id !== id);

        deleteSuccess();
        setCategories(updateCategories);
      }
      
    } catch (err) {
      deleteError();
      console.log(err);
    }
  }

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />
        <Title>Categorias</Title>
        <ContainerHeader>
          <SearchContainer>
            <input
              placeholder="Pesquise por uma categoria"
              onChange={handleSearchInputChange}
            />
            <AiOutlineSearch />
          </SearchContainer>

          <Link to="categories/create-category">
            <ButtonNew type="submit">Nova categoria</ButtonNew>
          </Link>
        </ContainerHeader>

        <TableContainer>
          <Thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </Thead>
          <Tbody>
            {categories.length > 0 &&
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td id="buttons">
                    <ButtonDelete
                      type="button"
                      id="delete"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <RiCloseCircleFill />
                    </ButtonDelete>
                    <Link
                      to={{
                        pathname: 'categories/edit-category',
                        state: {
                          id: category.id,
                          name: category.name,
                        },
                      }}
                    >
                      <ButtonEdit type="button">
                        <FiEdit2 />
                      </ButtonEdit>
                    </Link>
                  </td>
                </tr>
              ))}
          </Tbody>
        </TableContainer>
      </Body>
    </Container>
  );
};

export default Categories;
