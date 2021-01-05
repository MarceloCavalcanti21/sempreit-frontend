import React, {
  useRef, useCallback, useState,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Content, Title,
} from './styles';

import Input from '../../components/InputLabel';
import Button from '../../components/Button';

import api from '../../services/api';

interface NewProductFormData {
    description: string;
    amount: number;
}

interface LocationState {
    id: string;
    description: string;
    amount: number;
    request: string;
  }

const AnalystsNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation<LocationState>();

  const { addToast } = useToast();
  const history = useHistory();

  const [productAmount, setProductAmount] = useState<string>();

  const handleSubmit = useCallback(async (data: NewProductFormData) => {
    try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required('Obrigatório'),
          amount: Yup.string().required('Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          description,
        } = data;

        const formData = {
          description,
          amount: productAmount,
        };

        // Se for uma INCLUSÃO...
        if (location.state.request === 'new') {
          await api.post('/products', formData);

          addToast({
            type: 'sucess',
            title: 'Sucesso!',
            description: 'O produto foi cadastrado com sucesso!',
          });
        }
        // Se for uma EDIÇÃO...
        else {
          await api.put(`/products/${location.state.id}`, formData);

          addToast({
            type: 'info',
            title: 'Sucesso!',
            description: 'O produto foi atualizado com sucesso!',
          });
        }


        history.push('/home');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro cadastro',
        description: 'Ocorreu um erro ao processar a sua requisição. Por favor, verifique as informações e tente novamente.',
      });
    }
  }, [addToast, history, productAmount, location.state.request, location.state.id]);

  // Formatação instantânea no formato de MOEDA (BRL)
  const handleCurrency = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    e.currentTarget.value = value;

    // Utilizando REGEX
    const formattedValue = value.replace(/\./g, '').replace(',', '.');

    setProductAmount(formattedValue);
  }, []);

  return (
    <Container>
      <Content>

        {location.state.request === 'new' ? (
          <Title>Novo produto</Title>
        ) : (
          <Title>Editar produto</Title>
        )}

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            description: location.state.description,
            amount: location.state.amount,
          }}
        >
          <Input autoComplete="off" id="1" name="description" label="Descrição do produto" />

          <Input autoComplete="off" id="2" name="amount" label="Valor" onKeyUp={handleCurrency} />

          {location.state.request === 'new' ? (
            <Button type="submit">Cadastrar</Button>
          ) : (
            <Button type="submit">Salvar</Button>

          )}

        </Form>
      </Content>
    </Container>
  );
};

export default AnalystsNew;
