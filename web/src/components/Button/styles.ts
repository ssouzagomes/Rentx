import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #089b63;
  color: #FFF;

  height: 48px;
  width: 200px;
  padding: 0 16px;
  margin-top: 16px;

  border-radius: 4px;
  border: none;
  cursor: pointer;

  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.2s;
  
  outline: none;

  &:hover {
    background: ${shade(0.1, '#088a58')};
  }
`;