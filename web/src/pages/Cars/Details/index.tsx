
import React, { useRef, useCallback, ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { RiCloseCircleFill } from 'react-icons/ri';

import api from '../../../services/api'
import lambo from '../../../assets/images/lambo.png'

import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';
import { Body } from '../../../components/Styles/Body';
import { Title } from '../../../components/Styles/Title';
import Button from '../../../components/Button/index'

import {
  Container,
  BackButtonTitleContainer,
  BackButton,
  TitleContainer,
  Main,
  ImageContainer,
  LineDetailContainer,
  FieldContainer,
  PricePerDayContainer,
  ButtonsContainer,
  ButtonDelete,
  ButtonEdit,
  ButtonRentalContainer
} from './styles';
import { useAuth } from '../../../hooks/auth';

interface Car {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

const DetailsCar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { user } = useAuth()
  const location = useLocation();
  const car = location.state as Car;

  const [diffDays, setDiffDays] = useState<number>()

  const handleChangeInput = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      await api.post('rentals', {
        expected_return_date: value,
        car_id: car.id
      })

      const Difference_In_Time = new Date(value).getTime() - new Date().getTime();
      const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

      setDiffDays(Difference_In_Days + 1)
    },
    [car],
  );

  function createSuccess() {
    toast.success('Carro alugado com sucesso!');
  }

  function createError() {
    Swal.fire(
      'Erro!',
      'Ocorreu um erro ao alugar o carro, verifique os dados e tente novamente.',
      'error',
    );
  }

  const handleSubmit = useCallback(async () => {
    try { 
      createSuccess();
      history.push('/cars');
    } catch (error) {
      createError();
    }
  }, [history]);

  function deleteSuccess() {
    toast.success('Carro deletado com sucesso');
  }

  function deleteError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao deletar o carro.', 'error');
  }

  async function deleteUser(id: string) {
    try {
      const alert = window.confirm("Deseja excluir o carro?")

      if (alert) {
        await api.delete(`/cars/${id}`);
        deleteSuccess();
        history.push('/cars')
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
            <Title>Detalhes do {car.name}</Title>
          </TitleContainer>
        </BackButtonTitleContainer>

        <Main>
          <ImageContainer>
            <img src={lambo} alt="Imagem do carro" />
          </ImageContainer>

          <LineDetailContainer>
            <FieldContainer>
              <span>{car.brand}</span>
              <p>{car.name}</p>
            </FieldContainer>

            <PricePerDayContainer>
              <span>AO DIA</span>
              <p>R$ {car.daily_rate}</p>
            </PricePerDayContainer>

            {user.isAdmin ? (
              <ButtonsContainer>
                <Link
                  to={{
                    pathname: '../cars/edit-car',
                    state: {
                      id: car.id,
                      name: car.name,
                    },
                  }}
                >
                  <ButtonEdit type="button">
                    <FiEdit2 />
                  </ButtonEdit>
                </Link>
                <ButtonDelete
                  type="button"
                  id="delete"
                  onClick={() => deleteUser(car.id)}
                >
                  <RiCloseCircleFill />
                </ButtonDelete>
              </ButtonsContainer>
            ) : (
              ''
            )}
          </LineDetailContainer>

          <LineDetailContainer>
            <FieldContainer>
              <span>Descrição</span>
              <p>{car.description}</p>
            </FieldContainer>

            <FieldContainer>
              <span>Placa</span>
              <p>{car.license_plate}</p>
            </FieldContainer>

            <FieldContainer>
              <span>Multa por atraso</span>
              <p>R$ {car.fine_amount}</p>
            </FieldContainer>
          </LineDetailContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <LineDetailContainer>
              <FieldContainer>
                <label htmlFor="expected_return_date">Escolha uma data para devolução</label>
                <input
                  type="date"
                  name="expected_return_date"
                  onChange={handleChangeInput}
                />
              </FieldContainer>
            </LineDetailContainer>

            <LineDetailContainer className="total">
              <FieldContainer>
                <span>TOTAL</span>
                <p>R$ {car.daily_rate} x {diffDays} dias</p>
              </FieldContainer>

              <FieldContainer>
                <span> </span>
                <p>R$ {diffDays ? car.daily_rate * diffDays: ''}</p>
              </FieldContainer>

              <FieldContainer>
                <ButtonRentalContainer>
                  <Button type="submit">Alugar agora</Button>
                </ButtonRentalContainer>
              </FieldContainer>
            </LineDetailContainer>
          </Form>
        </Main>
      </Body>
    </Container>
  );
}

export default DetailsCar