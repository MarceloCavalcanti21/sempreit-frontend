import React from 'react';

import { FiPower } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import {
  HeaderContainer, HeaderContent, ContentProfile, Profile,
} from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';


const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="logo" />

          <ContentProfile>
            <Profile>
              <div>
                <span>Bem-vindo(a),</span>
                <Link to="/"><strong>{user.name}</strong></Link>
              </div>
            </Profile>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </ContentProfile>

        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
