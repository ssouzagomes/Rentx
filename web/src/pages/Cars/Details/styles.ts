import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100vw;
  height: 100vh;
`;

export const BackButtonTitleContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const BackButton = styled.div`
  width: 10%;
`
export const TitleContainer = styled.div`
  width: 85%;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60vh;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 30rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding-left: 2rem;
  padding-right: 2rem;

  .total {
    margin-top: 2rem;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 2rem;
`

export const LineDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 2rem;

  span,
  label {
    font-family: 'Poppins' sans-serif;
    font-weight: 500;
    color: #AEAEB3;
    font-size: 1.5rem;
  }

  p {
    font-family: Ubuntu;
    font-weight: 500;
    font-size: 1.75rem;
  }
`

export const FieldContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`

export const PricePerDayContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #DC1637;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonDelete = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.3rem;
  border: transparent;

  background: #DC1637;
  border-radius: 0.25rem;

  color: #ffffff;
  transition: background-color 0.2s;
  
  :hover {
    background: ${shade(0.2, '#DC1637')};
  }
`;

export const ButtonEdit = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.3rem;
  border: transparent;

  background: #063966;
  border-radius: 0.25rem;

  color: #ffffff;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#063966')};
  }
`;

export const ButtonRentalContainer = styled.div`
  display: flex;
  justify-content: center;
`