import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  type?: boolean;
}

interface LabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;

  border-bottom: 2px solid #666;
  margin-bottom: 20px;

  color: #292929;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      svg {
        color: #c53030;
      }
    `}

  ${props =>
    props.isFocused &&
    css`
      border-bottom: 2px solid #DC1637;
      color: #DC1637;

      svg {
        color: #DC1637;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #DC1637;
    `}

  input {
    color: #292929;
    background: transparent;
    border: none;
    width: 100%;
    &::placeholder {
      color: #292929;
    }
  }

  svg {
      margin-right: 14px;
  }
`;

export const Label = styled.label<LabelProps>`
  color: #818e9b;

  ${props =>
    props.isFocused &&
    css`
      color: #109cf1;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #109cf1;
    `}
`;