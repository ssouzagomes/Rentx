import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Body } from '../../components/Styles/Body';
import { Title } from '../../components/Styles/Title';

import { useAuth } from '../../hooks/auth';
import { useSignMenu } from '../../hooks/toggle';

import { Container } from './styles';

export function Dashboard() {
  const { handleChangeActivatedMenu } = useSignMenu();
  handleChangeActivatedMenu('dashboard');

  const { user } = useAuth()

  return (
    <Container>
      <SideBar />
      <Header />

      <Body>
        <Title>Bem vindo, {user.name}!</Title>
      </Body>
    </Container>
  );
};

export default Dashboard;
