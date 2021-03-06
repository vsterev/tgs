import React, { useContext } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Login from './components/users/login';
import Register from './components/users/register';
import Home from './components/home';
import HomeAuth from './components/homeAuth';
import AuthContext from './utils/context';
const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/login" render={!loggedIn ? () => <Login /> : () => <HomeAuth />} />
        <Route path="/admin/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
