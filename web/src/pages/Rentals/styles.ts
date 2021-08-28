import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 98vw;
  height: 100vh;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 22rem;

  background: #d8d8d8;
  border-radius: 0.75rem;

  input {
    width: 90%;
    height: 2.6rem;

    font-size: 1rem;
    padding-left: 1rem;
    border: none;

    background: transparent;
    color: #292929;
  }
`;

export const ButtonNew = styled.button`
  width: 8rem;
  height: 2rem;
  color: #ffffff;
  border: none;

  font-family: Ubuntu;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;

  background: #089b63;
  border-radius: 0.25rem;

  :hover {
    background: ${shade(0.1, '#088a58')};
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 1rem;
  
  margin-top: 2rem;

  @media(min-width: 93rem) {
    grid-template-columns: auto auto auto auto;
  }
`

export const CarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 20rem;
  height: 16rem;

  border-radius: 0.5rem;
  background: #F4F5F6;

  margin-bottom: 2rem;
`

export const HeaderCar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-align: center;

  padding: 1rem;

  width: 100%;

  span {
    font-family: 'Poppins' sans-serif;
    font-weight: 500;
    color: #AEAEB3;
    font-size: 1rem;
  }

  p {
    font-family: Ubuntu;
    font-weight: 500;
    font-size: 1.25rem;
  }
`

export const TitleCar = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #47474D;
  }
`

export const PricePerDay = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #DC1637;
  }
`

export const ImageCar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

export const ButtonDetails = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.5rem;
  width: 100%;

  border: none;
  border-top: 1px solid #47474D;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background: #e25822;
  
  transition: background-color 0.2s;
  
  outline: none;

  &:hover {
    background: ${shade(0.1, '#e25822')};
  }

  font-family: 'Poppins' sans-serif;
  color: #fff;
  font-weight: 600;
`