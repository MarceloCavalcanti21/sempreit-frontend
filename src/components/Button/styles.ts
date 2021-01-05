import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #1d1d1b;
    height: 56px;
    border-radius: 3px;
    border: 0px;
    padding: 0 16px;
    color: #FFF;
    width: 100%;
    font-weight: bold;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#1d1d1b')};
    }

    @media (max-width: 500px) {
        height: 50px;
    }
`;
