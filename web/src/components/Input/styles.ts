import styled, { css } from 'styled-components';
import Tooltip from '../Tootlip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;

  border-radius: 0.25rem;

  border-bottom: 0.15rem solid transparent;
  padding: 0.75rem 1rem;
  width: 26rem;
  height: 3rem;

  color: #292929;
  background-color: #c5c0c0;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 1.125rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-bottom: #c53030;
      svg {
        color: #c53030;
      }
    `}

  ${props =>
    props.isFocused &&
    css`
      border-bottom: 0.15rem solid #1B1B1F;
      color: #1B1B1F;

      svg {
        color: #1B1B1F;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #063966;
    `}

    input {
      color: #292929;
      background: transparent;
      border: 0;
      width: 100%;
      height: 1.5rem;
    &::placeholder {
      color: #292929;
    }
  }
  svg {
    margin-left: 0rem;
    margin-right: 0.88rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1.25rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    border-color: #c53030 transparent;
  }
`;
