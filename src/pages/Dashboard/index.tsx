import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';

import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Input from '../../components/InputLabel';

import {
  Container,
  Header,
  Title,
  AddButton,
  Content,
  ContainerHeaderGrid,
  ItemsContainer,
  HeaderProductTitle,
  HeaderProductAmount,
  HeaderProductActions,
  ProductsList,
  ProductTitle,
  ProductAmount,
  ButtonsContainer,
  SearchContainer,
  SearchMessage,
  EditIcon,
  DeleteIcon,
} from './styles';

  interface Products {
      id: string;
      description: string;
      amount: number;
  }

const Dashboard: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [products, setProducts] = useState<Products[]>([]);
  const [foundProducts, setFoundProducts] = useState<Products[]>([]);
  const [searchEnabled, setSearchEnabled] = useState(false); // Esse hook controla se vamos mostrar para o usuário a listagem principal ou o resultado da busca (array alternativo)

  useEffect(() => {
    api.get('/products').then((response) => setProducts(response.data));
  }, []);

  // Formata o valor dos produtos do array principal para serem mostrados no grid para o tipo de moeda REAL BRASILEIRO
  const formattedProducts = useMemo(() => products
    .map((item) => {
      const { id } = item;
      const { description } = item;
      const formattedAmount = Number(item.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      return {
        id, description, formattedAmount,
      };
    }), [products]);

  // Formata o valor dos produtos do array de pesquisa para serem mostrados no grid para o tipo de moeda REAL BRASILEIRO
  const formattedFoundProducts = useMemo(() => foundProducts
    .map((item) => {
      const { id } = item;
      const { description } = item;
      const formattedAmount = Number(item.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 });

      return {
        id, description, formattedAmount,
      };
    }), [foundProducts]);

  // Faz a busca do item no array
  const handleFind = useCallback((data) => {
    try {
      // Esse hook indica que a função de busca foi acionada
      setSearchEnabled(true);

      // Cria uma expressão Regex com a variável
      const regex = new RegExp(data, 'i');
      // Com essa expressão criada, filtrei o array (FILTER) testando (test) a condição 'description'
      const product = products.filter((item) => regex.test(item.description));
      setFoundProducts(product);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao buscar esse produto. Por favor, tente novamente.',
      });
    }
  }, [addToast, products]);

  const handleRemove = useCallback(async (id) => {
    try {
      await api.delete(`/products/${id}`);

      addToast({
        type: 'sucess',
        title: 'Sucesso!',
        description: 'Acabamos de remover esse produto pra você ;D',
      });

      setSearchEnabled(false);

      api.get('/products').then((response) => setProducts(response.data));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu um erro ao remover esse produto. Por favor, tente novamente.',
      });
    }
  }, [addToast]);
  return (
    <>
      <Container>
        <Header>
          <Title>Painel de produtos</Title>

          <Form ref={formRef} onSubmit={() => {}}>

            <Input autoComplete="off" id="1" name="product" label="Buscar um produto" onKeyUp={(event: any) => handleFind(event.target.value)} />

            <AddButton>
              <FiPlus
                onClick={() => {
                  history.push({
                    pathname: '/product',
                    state: {
                      id: '', description: '', amount: '', request: 'new',
                    },
                  });
                }}
                style={{
                  width: 40, height: 40, color: '#fff',
                }}
              />
            </AddButton>
          </Form>
        </Header>

        <Content>
          {/* Se a busca estiver ativada, esconder o array principal e mostrar apenas o de busca */}
          {searchEnabled ? (
            <>
              {foundProducts.length !== 0
                ? (
                  <>
                    <ContainerHeaderGrid>
                      <ItemsContainer>
                        <HeaderProductTitle>Produto</HeaderProductTitle>
                        <HeaderProductAmount>Valor</HeaderProductAmount>
                        <HeaderProductActions>Ações</HeaderProductActions>
                      </ItemsContainer>
                    </ContainerHeaderGrid>

                    {formattedFoundProducts.map((product) => (
                      <ProductsList key={product.id}>
                        <ItemsContainer>
                          <ProductTitle>{product.description}</ProductTitle>
                          <ProductAmount>{product.formattedAmount}</ProductAmount>
                          <ButtonsContainer>
                            <EditIcon
                              onClick={() => {
                                history.push({
                                  pathname: '/product',
                                  state: {
                                    id: product.id, description: product.description, amount: product.formattedAmount, request: 'edit',
                                  },
                                });
                              }}
                            />
                            <DeleteIcon
                              onClick={() => { handleRemove(product.id); }}
                            />
                          </ButtonsContainer>
                        </ItemsContainer>

                      </ProductsList>
                    ))}
                  </>
                ) : <SearchContainer><SearchMessage>Nenhum produto foi encontrado ;(</SearchMessage></SearchContainer>}
            </>
          ) : (
            <>
              {products.length !== 0
                ? (
                  <>
                    <ContainerHeaderGrid>
                      <ItemsContainer>
                        <HeaderProductTitle>Produto</HeaderProductTitle>
                        <HeaderProductAmount>Valor</HeaderProductAmount>
                        <HeaderProductActions>Ações</HeaderProductActions>
                      </ItemsContainer>
                    </ContainerHeaderGrid>

                    {formattedProducts.map((product) => (
                      <ProductsList key={product.id}>
                        <ItemsContainer>
                          <ProductTitle>{product.description}</ProductTitle>
                          <ProductAmount>{product.formattedAmount}</ProductAmount>
                          <ButtonsContainer>
                            <EditIcon
                              onClick={() => {
                                history.push({
                                  pathname: '/product',
                                  state: {
                                    id: product.id, description: product.description, amount: product.formattedAmount, request: 'edit',
                                  },
                                });
                              }}
                            />
                            <DeleteIcon
                              onClick={() => { handleRemove(product.id); }}
                            />
                          </ButtonsContainer>
                        </ItemsContainer>

                      </ProductsList>
                    ))}
                  </>
                ) : <SearchContainer><SearchMessage>Nenhum produto cadastrado ;(</SearchMessage></SearchContainer>}
            </>
          )}


        </Content>

      </Container>
    </>
  );
};


export default Dashboard;
