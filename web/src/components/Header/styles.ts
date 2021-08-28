import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  width: 100%;

  padding: 1.25rem;
  height: 4.5rem;

  background: #29292E;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 6.81rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.45rem;

  span {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;

    margin-right: 2rem;
    margin-left: 1rem;
  }

  img {
    width: 3rem;
    border-radius: 50%;
    margin-right: 2.5rem;

    cursor: pointer;
  }
`;

export const Exit = styled.div`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  svg {
    color: #fff;
  }

  span {
    font: 'Poppins', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
  }
`;
