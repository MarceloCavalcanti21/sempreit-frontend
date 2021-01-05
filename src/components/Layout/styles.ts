import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
`;

// Envolverá
export const Content = styled.div`
    display: flex;
`;

// Conteúdo da página que será apresentada
export const Page = styled.div`
    margin: 0 auto;
    flex: 1;
    align-items: center;
    flex-direction: column;
`;
