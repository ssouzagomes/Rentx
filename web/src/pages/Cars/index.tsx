import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api'
import lambo from '../../assets/images/lambo.png'

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Body } from '../../components/Styles/Body';
import { Title } from '../../components/Styles/Title';
import {
  Container,
  ContainerHeader,
  SearchContainer,
  ButtonNew,
  Main,
  CarContainer,
  HeaderCar,
  TitleCar,
  PricePerDay,
  ImageCar,
  ButtonDetails
} from './styles'

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

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const { user } = useAuth()

  useEffect(() => {
    api.get('/cars/available').then(response => {
      setCars(response.data);
    });
  }, []);

  const getCars = useCallback(() => {
    api.get('/cars').then(response => {
      setCars(response.data);
    });
  }, []);

  const searchCars = useCallback(
    (value: string) => {
      const filterCars = cars.filter(car => car.name.indexOf(value) !== -1);

      setCars(filterCars);
    },
    [cars],
  );

  const handleSearchInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      return value === '' ? getCars() : searchCars(value);
    },
    [getCars, searchCars],
  );

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />

        <Title>Carros disponíveis</Title>
        <ContainerHeader>
          <SearchContainer>
            <input
              placeholder="Pesquise por um carro"
              onChange={handleSearchInputChange}
            />
            <AiOutlineSearch />
          </SearchContainer>

          {
            user.isAdmin ? (
              <Link to="cars/create-car">
                <ButtonNew type="submit">Novo carro</ButtonNew>
              </Link>
            ) : (
              ''
            )
          }
        </ContainerHeader>

        <Main>
          {cars.length > 0 &&
            cars.map(car => (
              <CarContainer>
                <HeaderCar>
                  <TitleCar>
                    <span>{car.brand}</span>
                    <p>{car.name}</p>
                  </TitleCar>

                  <PricePerDay>
                    <span>AO DIA</span>
                    <p>R$ {car.daily_rate}</p>
                  </PricePerDay>
                </HeaderCar>

                <ImageCar>
                  <img src={lambo} alt="Imagem do carro" />
                </ImageCar>

                <Link
                  to={{
                    pathname: 'cars/details',
                    state: {
                      id: car.id,
                      name: car.name,
                      description: car.description,
                      daily_rate: car.daily_rate,
                      license_plate: car.license_plate,
                      fine_amount: car.fine_amount,
                      brand: car.brand,
                      category_id: car.category_id
                    },
                  }}
                >
                  <ButtonDetails>
                    Ver detalhes
                  </ButtonDetails>
                </Link>
              </CarContainer>
            ))
          }
        </Main>
      </Body>
    </Container>
  );
};


export default Cars;