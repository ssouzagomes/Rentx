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

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const getUsers = useCallback(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const searchUsers = useCallback(
    (value: string) => {
      const filterUsers = users.filter(user => user.name.indexOf(value) !== -1);

      setUsers(filterUsers);
    },
    [users],
  );

  const handleSearchInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      return value === '' ? getUsers() : searchUsers(value);
    },
    [getUsers, searchUsers],
  );

  function deleteSuccess() {
    toast.success('Usuário deletado com sucesso');
  }

  function deleteError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao deletar o usuário.', 'error');
  }

  async function deleteUser(id: string) {
    try {
      const alert = window.confirm("Deseja excluir o usuário?")

      if (alert) {
        await api.delete(`/users/${id}`);
        const updateUsers = users.filter(user => user.id !== id);

        deleteSuccess();
        setUsers(updateUsers);
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
        <Title>Usuários</Title>
        <ContainerHeader>

          <SearchContainer>
            <input
              placeholder="Pesquise por um usuário"
              onChange={handleSearchInputChange}
            />
            <AiOutlineSearch />
          </SearchContainer>

          <Link to="users/create-user">
            <ButtonNew type="submit">Novo usuário</ButtonNew>
          </Link>
        </ContainerHeader>

        <TableContainer>
          <Thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nº carteira de motorista</th>
              <th>Ações</th>
            </tr>
          </Thead>
          <Tbody>
            {users.length > 0 &&
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.driver_license}</td>
                  <td id="buttons">
                    <ButtonDelete
                      type="button"
                      id="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <RiCloseCircleFill />
                    </ButtonDelete>
                    <Link
                      to={{
                        pathname: 'users/edit-user',
                        state: {
                          id: user.id,
                          name: user.name,
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

export default Users;
