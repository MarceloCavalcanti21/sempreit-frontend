import styled from 'styled-components';
import { shade } from 'polished';
import { Edit, DeleteForever } from '../../styles/Icons';

export const Container = styled.main`
overflow-y: hidden;

    form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        align-items: center;
        align-content: center;
        place-content: center;

        > div {
            width: 610px;
            border-radius: 4px 0 0 4px;
        }
    }
`;

export const Header = styled.div`
    max-width: 1120px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled.text`
    font-size: 60px;
    font-weight: 700;
    color: #575756;
    font-family: 'Ubuntu'
`;

export const AddButton = styled.button`
    place-content: center;
    width: 50px;
    height: 43px;
    background-color: #1d1d1b;
    border: 0;
    border-radius: 0 4px 4px 0;
`;

export const Content = styled.div`
    margin: auto;
    margin-top: 35px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 250px ;
`;

export const ContainerHeaderGrid = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    background: #1d1d1b;
    border-radius: 2px;

    & + div {
        margin-top: 16px;
    }
`;

export const ItemsContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
`;

export const HeaderProductTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    width: 45%;

`;

export const HeaderProductAmount = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    width: 45%;
    margin: 0 30px;
`;

export const HeaderProductActions = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #FFF;
    align-items: center;
    text-align: center;
    width: 10%;
`;

export const ProductsList = styled.div`
    width: 100%;
    display: flex;
    padding: 0 20px;
    align-items: center;

    border-bottom: #B1B1B1 solid 0.8px ;

    & + div {
        margin-top: 16px;
    }
`;

export const ProductTitle = styled.div`
    font-size: 20px;
    font-weight: 800;
    color: #666360;
    width: 45%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ProductAmount = styled.div`
    font-size: 20px;
    font-weight: 800;
    color: #666360;
    width: 45%;
    margin: 0 30px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ButtonsContainer = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SearchContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
`;

export const SearchMessage = styled.text`
    font-size: 30px;
    font-weight: 600;
    color: #666360;
`;

export const EditIcon = styled(Edit)`
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    color: #0B7FE3;
    :hover {
        cursor: pointer;
        color: ${shade(0.2, '#0B7FE3')};

    }
`;

export const DeleteIcon = styled(DeleteForever)`
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    color: #7B0707;
    :hover {
        cursor: pointer;
        color: ${shade(0.2, '#7B0707')};
    }
`;
