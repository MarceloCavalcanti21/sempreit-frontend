import styled from 'styled-components';

export const HeaderContainer = styled.header`
    padding: 6px 0;
    background: #1d1d1b;
    position: sticky;
    top: 0;
    z-index: 2;
`;

export const HeaderContent = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    > img {
        height: 50px;
    }
`;

export const ContentProfile = styled.div`
    display: flex;
    align-items: center;

    button {
        margin-left: 40px;
        background: transparent;
        border: 0;

        svg {
            color: #6B6B6B;
            width: 20px;
            height: 20px;
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        line-height: 24px;

        span {
            color: #f4ede8;
        }

        a {
            text-decoration: none;
            color: #6B6B6B;

            &:hover {
                opacity: 0.8;
            }
        }

    }
`;
