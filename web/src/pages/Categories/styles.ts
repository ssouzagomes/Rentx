import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100vw;
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

export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 1.5rem;
`;

export const Thead = styled.div`
  background: rgba(41, 41, 46, 0.80);
  border-radius: 0.25rem;
  margin-bottom: 0.7rem;

  th {
    width: 100vw;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    padding: 0.5rem;

    color: #fff;
  }
`;

export const Tbody = styled.div`
  border-radius: 0.5rem;
  display: grid;
  gap: 0.5rem;
  width: 100%;

  tr {
    background: #e5e5e5;
    &:hover {
      background: ${shade(0.2, '#E5E5E5')};
    }

    height: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
  }

  td {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    color: #05233e;
  }

  td#buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

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