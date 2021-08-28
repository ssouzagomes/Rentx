import styled from 'styled-components';

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

  select {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    height: 2.5rem;

    font-family: 'Poppins' sans-serif;
    font-size: 1rem;
  }
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