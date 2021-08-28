
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import React, {useRef, useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiDisc, FiFileText } from "react-icons/fi";

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

interface UserFormData {
  name: string;
  description: string;
}

const CreateCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  function createSuccess() {
    toast.success('Categoria criada com sucesso!');
  }

  function createError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao criar a categoria, verifique os dados e tente novamente.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          description: Yup.string().required('Descrição obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('categories', {
          name: data.name,
          description: data.description,
        })

        createSuccess();
        history.push('/categories');
      } catch (error) {
        createError();
      }
    },
    [history],
  );

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />

        <BackButtonTitleContainer>
          <BackButton>
            <Link to="/categories">
              <span>
                <FiArrowLeft
                  size={25}
                  color={'#3D3D4D'}
                />
              </span>
            </Link>
          </BackButton>
          <TitleContainer>
            <Title>Criar categoria</Title>
          </TitleContainer>
        </BackButtonTitleContainer>
        

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <InputForm
                name="name"
                icon={FiDisc}
                required={true}
                labelName="Nome"
                placeholder="Nome"
              />

              <InputForm
                name="description"
                type="text"
                icon={FiFileText}
                required={true}
                labelName="Descrição"
                placeholder="Descrição"
              />

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

export default CreateCategory