import React, { useContext } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/users/login';
import Register from './components/users/register';
import Home from './components/home';
import HomeAuth from './components/homeAuth';
import AuthContext from './utils/context';
import Logout from './components/users/logout';
import RepsAll from './components/reps/getAll';
const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/admin" />
        </Route>
        <Route path="/admin" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/login" render={!loggedIn ? () => <Login /> : () => <HomeAuth />} />
        <Route path="/admin/reps/all" component={<RepsAll />} />
        <Route path="/admin/register" component={Register} />
        <Route path="/admin/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
