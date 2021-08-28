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
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 30rem;

  .checkbox {
    display: flex;
    justify-content: space-between;

    label {
      font: Ubuntu;
      color: #292929;
      font-size: 1.25rem;
      font-weight: 400;
    }

    input {
      transform: scale(1.8);

      cursor: pointer;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`