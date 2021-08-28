import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1B1B1F;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;

  flex-wrap: wrap;
  width: 30rem;
  height: 26rem;

  padding: 2.25rem;

  background: #dbdbdb;
  border-radius: 0.625rem;
  box-shadow: 0.625rem 0.625rem 0.25rem rgba(0, 0, 0, 0.25);
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 8rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: 'Poppins' sans-serif;
    font-weight: 500;
    font-size: 1.125rem;
    color: #1B1B1F;

    transform: color 0.2s;
  }

  .recuperation {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 0.5rem;

    span {
      font-family: 'Poppins' sans-serif;
      font-weight: 500;
      font-size: 0.75rem;
      color: #1B1B1F;

      transform: color 0.2s;
    }

    .error-password {
      margin-left: 3rem;
      color: #DC1637;
    }
  }
`;

export const FormButton = styled.div`
  width: 100%;
  height: 2.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 7.875rem;
  height: 2.5rem;

  margin-top: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;

  background: #DC1637;
  border: none;
  color: white;

  transition: 0.5s;

  &:hover {
    background: ${shade(0.4, '#DC1637')};
  }

  span {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;

    padding-right: 0.2rem;
  }
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
