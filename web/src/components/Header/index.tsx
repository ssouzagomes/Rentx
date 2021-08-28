import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import {
  Container,
  Logo,
  ContentContainer,
  Profile,
  Exit,
} from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user, verifyTokenExpiration } = useAuth();

  verifyTokenExpiration();

  return (
    <Container>
      <Logo>
        <Link to="/dashboard">
          <img src={logo} alt="Logo Rentx" />
        </Link>
      </Logo>
      <ContentContainer>
        <Link 
          to={{
            pathname: 'users/edit-user',
            state: {
              id: user.id,
              name: user.name,
            },
          }}
        >
          <Profile>
            <span>{user.name}</span>
            {/* <img src={user.avatar_url} alt="User Avatar" /> */}
          </Profile>
        </Link>
        <Exit>
          <Link to="/" onClick={signOut}>
            <span>SAIR</span>
          </Link>
        </Exit>
      </ContentContainer>
    </Container>
  );
};

export default Header;
