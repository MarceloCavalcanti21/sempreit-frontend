import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

import Input from '../../components/InputLabel';
import Button from '../../components/Button';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/home');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'info',
        title: 'Erro no login',
        description: 'Ocorreu um erro ao fazer login. Verifica se o seu e-mail e senha estão corretos e tenta de novo, por favor.',
      });
    }
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="SempreIT" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu log-in</h1>

            <Input autoComplete="off" id="1" name="email" label="E-mail" />

            <Input autoComplete="off" id="2" name="password" label="Senha" type="password" />

            <Button type="submit">Entrar</Button>

          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
