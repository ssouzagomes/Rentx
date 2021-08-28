
import React, {useRef, useCallback} from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiTrello } from "react-icons/fi";
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

interface UserFormData {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

const CreateUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  function createUserSuccess() {
    toast.success('Usuário criado com sucesso!');
  }

  function createUserError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao criar o usuário, verifique os dados e tente novamente.',
      'error',
    );
  }

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string().required('Email obrigatório.'),
          password: Yup.string().required('Senha obrigatória.'),
          driver_license: Yup.string().required('Carteira de motorista obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', {
          name: data.name,
          email: data.email,
          password: data.password,
          driver_license: data.driver_license
        })

        createUserSuccess();
        history.push('/users');
      } catch (error) {
        createUserError();
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
            <Link to="/users">
              <span>
                <FiArrowLeft
                  size={25}
                  color={'#3D3D4D'}
                />
              </span>
            </Link>
          </BackButton>
          <TitleContainer>
            <Title>Criar usuário</Title>
          </TitleContainer>
        </BackButtonTitleContainer>
        

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <InputForm
                name="name"
                icon={FiUser}
                required={true}
                labelName="Nome"
                placeholder="Nome"
              />

              <InputForm
                name="email"
                type="email"
                icon={FiMail}
                required={true}
                labelName="Email"
                placeholder="Email"
              />
                
              <InputForm
                name="password"
                type="password"
                icon={FiLock}
                required={true}
                labelName="Senha"
                placeholder="Senha"
              />

              <InputForm
                name="driver_license"
                type="text"
                icon={FiTrello}
                required={true}
                labelName="Nº carteira de motorista"
                placeholder="Nº carteira de motorista"
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

export default CreateUser