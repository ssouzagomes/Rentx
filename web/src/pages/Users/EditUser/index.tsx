
import React, { useRef, useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";
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
import { useAuth } from '../../../hooks/auth';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  driver_license: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  driver_license: string;
}

const EditUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { user } = useAuth()

  const [admin, setAdmin] = useState()

  const location = useLocation();
  const userLocation = location.state as User;

  console.log(userLocation)

  function editUserSuccess() {
    toast.success('Usuário editado com sucesso!');
  }

  function editUserError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao editar o usuário, verifique os dados e tente novamente.',
      'error',
    );
  }

  function handleChangeAdmin(event: any): void {
    const isAdmin = event.target.checked;
    setAdmin(isAdmin);
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

        console.log(userLocation)

        await api.put(`users/${userLocation.id}`, {
          name: data.name,
          email: data.email,
          password: data.password,
          isAdmin: admin,
          driver_license: data.driver_license
        })

        editUserSuccess();
        history.push('/users');
      } catch (error) {
        editUserError();
      }
    },
    [history, userLocation, admin],
  );

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />

        <BackButtonTitleContainer>
          <BackButton>
            {user.isAdmin ? (
              <Link to="/users">
                <span>
                  <FiArrowLeft
                    size={25}
                    color={'#3D3D4D'}
                  />
                </span>
              </Link>
            ) : (
              <Link to="/dashboard">
                <span>
                  <FiArrowLeft
                    size={25}
                    color={'#3D3D4D'}
                  />
                </span>
              </Link>
            )}
          </BackButton>
          <TitleContainer>
            <Title>Editar usuário</Title>
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
                icon={FiLock}
                required={true}
                labelName="Nº carteira de motorista"
                placeholder="Nº carteira de motorista"
              />
              {user.isAdmin ? (
                <div className="checkbox">
                  <label htmlFor="isAdmin">Tornar usuário administrador</label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    onChange={handleChangeAdmin}
                  />
                </div>
              ) : (
                ''
              )}
              <ButtonContainer>
                <Button type="submit">Editar</Button>
              </ButtonContainer>

            </InputsContainer>
          </Form>
        </FormContainer>
      </Body>
    </Container>
  );
}

export default EditUser