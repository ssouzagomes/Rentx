
import React, { useRef, useCallback, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiTrello } from "react-icons/fi";
import * as Yup from 'yup';

import api from '../../../services/api'

import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';
import { Body } from '../../../components/Styles/Body';
import { Title } from '../../../components/Styles/Title';
import Button from '../../../components/Button/index'
import InputForm from '../../../components/InputForm';

import {
  Container,
  BackButtonTitleContainer,
  BackButton,
  TitleContainer,
  FormContainer,
  InputsContainer,
  ButtonContainer,
} from './styles';
import { useEffect } from 'react';
import { useState } from 'react';

interface CarFormData {
  name: string;
  description: string;
  daily_rate: string;
  license_plate: string;
  fine_amount: string;
  brand: string;
}

interface Category {
  id: string;
  name: string
}

const CreateCar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [categories, setCategories] = useState<Category[]>([])
  const [category_id, setCategoryId] = useState<string>()

  useEffect(() => {
    api.get<Category[]>('categories').then(response => {
      setCategories(response.data)
    })
  })

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setCategoryId(value);
  }

  function createSuccess() {
    toast.success('Carro criado com sucesso!');
  }

  function createError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao criar o carro, verifique os dados e tente novamente.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: CarFormData) => {
      try {
        formRef.current?.setErrors({});

        
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          description: Yup.string().required('Descrição obrigatória.'),
          daily_rate: Yup.string().required('Valor diário obrigatório.'),
          license_plate: Yup.string().required('Placa obrigatório.'),
          fine_amount: Yup.string().required('Multa por dia obrigatória.'),
          brand: Yup.string().required('Marca obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        
        await api.post('cars', {
          name: data.name,
          description: data.description,
          daily_rate: Number(data.daily_rate),
          license_plate: data.license_plate,
          fine_amount: Number(data.fine_amount),
          brand: data.brand,
          category_id: category_id
        })

        createSuccess();
        history.push('/cars');
      } catch (error) {
        createError();
      }
    },
    [history, category_id],
  );

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />

        <BackButtonTitleContainer>
          <BackButton>
            <Link to="/cars">
              <span>
                <FiArrowLeft
                  size={25}
                  color={'#3D3D4D'}
                />
              </span>
            </Link>
          </BackButton>
          <TitleContainer>
            <Title>Criar carro</Title>
          </TitleContainer>
        </BackButtonTitleContainer>


        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <InputForm
                name="name"
                icon={FiTrello}
                required={true}
                labelName="Nome"
                placeholder="Nome"
              />

              <InputForm
                name="description"
                icon={FiTrello}
                required={true}
                labelName="Descrição"
                placeholder="Descrição"
              />

              <InputForm
                name="daily_rate"
                icon={FiTrello}
                required={true}
                labelName="Valor diário"
                placeholder="Valor diário"
              />

              <InputForm
                name="license_plate"
                icon={FiTrello}
                required={true}
                labelName="Placa"
                placeholder="Placa"
              />

              <InputForm
                name="fine_amount"
                icon={FiTrello}
                required={true}
                labelName="Multa por dia"
                placeholder="Multa por dia"
              />

              <InputForm
                name="brand"
                icon={FiTrello}
                required={true}
                labelName="Marca"
                placeholder="Marca"
              />

              <select
                name="category_id"
                id="category_id"
                onChange={handleSelectChange}
              >
                <option disabled>Selecione uma categoria</option>
                  {
                    categories.length > 0 &&
                      categories.map(category => (
                        <option value={category.id}>{category.name}</option>
                    ))
                  }
              </select>

              <ButtonContainer>
                <Button type="submit">Cadastrar</Button>
              </ButtonContainer>

            </InputsContainer>
          </Form>
        </FormContainer>
      </Body>
    </Container>
  );
}

export default CreateCar