import React from 'react';

import 'react-day-picker/lib/style.css';

import Header from '../Header/index';

import {
  Container, Page, Content,
} from './styles';

const Layout: React.FC = ({ children }) => (
  <>
    <Container>
      <Content>
        <div
          style={{
            width: '100%',
          }}
        >
          <Header />
          <Page>
            { children }
          </Page>

        </div>
      </Content>
    </Container>

  </>
);


export default Layout;
