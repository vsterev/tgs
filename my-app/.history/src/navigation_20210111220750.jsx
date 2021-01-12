import React, { useContext } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import Auth from './utils/auth';
import Login from './components/users/login';
import Register from './components/users/register';
import Home from './components/home';
import HomeAuth from './components/homeAuth';
import AuthContext from './utils/context';
import Logout from './components/users/logout';
import RepsAll from './components/reps/getAll';
import RepAddHotel from './components/reps/add-hotel';
import RepAdd from './components/reps/add-rep';
import EditRep from './components/reps/edit-rep';
import DepartureByDate from './components/contacts/departureByDate';
import HomeContacts from './components/contacts/home/index.jsx';
import ErrorPage from './components/core/error-page';
import PopupMessage from './components/contacts/shared/popup-message';
import ArrivalByDate from './components/contacts/arrivalByDate';
const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {/* <AuthContext> */}
        <Route path="/" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/login" render={!loggedIn ? () => <Login /> : () => <RepsAll />} />
        <Route path="/admin/reps/all" render={loggedIn ? () => <RepsAll /> : () => <Login />} />
        <Route path="/admin/reps/add-hotel/:repId" render={loggedIn ? () => <RepAddHotel /> : () => <Login />} />
        <Route path="/admin/reps/add-rep" render={loggedIn ? () => <RepAdd /> : () => <Login />} />
        <Route path="/admin/reps/edit-rep/:repId" component={EditRep} />
        <Route
          path="/admin/bulk-sms/message-info/:messageId"
          render={loggedIn ? () => <PopupMessage /> : () => <Login />}
        />
        <Route path="/admin/register" component={Register} />
        <Route path="/admin/logout" component={Logout} />
        <Route path="/admin" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/transfer/departure/:date" component={DepartureByDate} />
        <Route path="/admin/contacts/home/" render={loggedIn ? () => <HomeContacts /> : () => <Login />} />
        <Route path="/admin/contacts/departure/" render={loggedIn ? () => <HomeContacts /> : () => <Login />} />
        <Route path="/admin/contacts/arrival" render={loggedIn ? () => <ArrivalByDate /> : () => <Login />} />
        <Route path="*" render={() => <ErrorPage msg="Page not Found - 404" />} />

        {/* </AuthContext> */}
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
