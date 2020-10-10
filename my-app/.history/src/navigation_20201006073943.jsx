import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/users/login';
const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/login" component="Login" />
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
