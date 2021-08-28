import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/images/logo.svg'

import {
  Container,
  Body,
  FormContainer,
  LogoContainer,
  Button,
  Text,
  FormButton,
} from './styles';

import Input from '../../components/Input';
import validationErrors from '../../utils/validateErrors';

interface SignInFormData {
  email: string;
  password: string;
}

export function Login() {
  const formRef = useRef<FormHandles>(null);
  const [error, setError] = useState('');

  const { signIn } = useAuth();

  const history = useHistory();

  async function handleSubmit(data: SignInFormData) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),

        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = validationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      setError('Falha no login, verifique usuário e/ou senha.');
    }
  }

  return (
    <Container>
      <Body>
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Text>
              <p>E-mail:</p>
            </Text>

            <Input id="email" name="email" icon={AiOutlineUser} />

            <Text>
              <p>Senha:</p>
            </Text>
            <Input
              id="password"
              name="password"
              type="password"
              icon={AiOutlineLock}
            />

            <div className="recuperation">
              <Link to="/login/reset-password">
                <span>Esqueceu a senha?</span>
                <span className="error-password">{error}</span>
              </Link>
            </div>

            <FormButton>
              <Button type="submit">
                <span>ENTRAR</span>
                <FiLogIn size={20} />
              </Button>
            </FormButton>
          </Form>
        </FormContainer>
      </Body>
    </Container>
  );
}

export default Login;
