import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './components/users/login';
import Register from './components/users/register';
import Home from './components/home';
const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin/login" component={Login} />
        <Route path="/admin/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
