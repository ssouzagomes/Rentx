import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai';

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
  Main,
  CarContainer,
  HeaderCar,
  TitleCar,
  PricePerDay,
  ImageCar,
  ButtonDetails
} from './styles'

interface Rental {
  id: string;
  car: {
    name: string;
    brand: string;
    daily_rate: string;
  };
}

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    api.get('/rentals/user').then(response => {
      setRentals(response.data);
    });
  }, []);

  const handleSearchInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const filterRentals = rentals.filter(rental => rental.car.name.indexOf(value) !== -1);

      setRentals(filterRentals);
    },
    [rentals],
  );

  function devolutionSuccess() {
    toast.success('Devolução concluída com sucesso');
  }

  function devolutionError() {
    Swal.fire('Erro!', 'Ocorreu um erro ao devolver o carro.', 'error');
  }

  async function devolutionRental(id: string) {
    try {
      const alert = window.confirm("Deseja realizar a devolução?")

      if (alert) {
        await api.post(`/rentals/devolution/${id}`);
        const updateRentals = rentals.filter(rental => rental.id !== id);

        devolutionSuccess();
        setRentals(updateRentals);
      }

    } catch (err) {
      devolutionError();
      console.log(err);
    }
  }

  return (
    <Container>
      <SideBar />
      <Header />
      <Body>
        <Toaster position="top-right" reverseOrder={false} />

        <Title>Carros alugados</Title>
        <ContainerHeader>
          <SearchContainer>
            <input
              placeholder="Pesquise por um carro"
              onChange={handleSearchInputChange}
            />
            <AiOutlineSearch />
          </SearchContainer>
        </ContainerHeader>

        <Main>
          {rentals.length > 0 &&
            rentals.map(rental => (
              <CarContainer>
                <HeaderCar>
                  <TitleCar>
                    <span>{rental.car.brand}</span>
                    <p>{rental.car.name}</p>
                  </TitleCar>

                  <PricePerDay>
                    <span>AO DIA</span>
                    <p>R$ {rental.car.daily_rate}</p>
                  </PricePerDay>
                </HeaderCar>

                <ImageCar>
                  <img src={lambo} alt="Imagem do carro" />
                </ImageCar>

                <ButtonDetails
                  type="button"
                  onClick={() => devolutionRental(rental.id)}
                >
                  Devolução
                </ButtonDetails>
              </CarContainer>
            ))
          }
        </Main>
      </Body>
    </Container>
  );
};


export default Rentals;