import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn/Index';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/home" component={Dashboard} isPrivate />
    <Route path="/product" component={Product} isPrivate />

  </Switch>
);

export default Routes;
