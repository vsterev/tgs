import React, { useContext } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import Auth from './utils/auth';
// import Login from './components/users/login';
import LoginPage from './components/pages/login';
import Register from './components/users/register';
import Home from './components/home';
import HomeAuth from './components/homeAuth';
import AuthContext from './utils/context';
import Logout from './components/users/logout';
// import RepsListAll from './components/reps/getAll';
import RepsListPage from './components/pages/repsListPage';
// import RepAddHotel from './components/reps/add-hotel';
import RepAddHotelPage from './components/pages/repAddHotel';
// import RepAdd from './components/reps/add-rep';
import RepAddPage from './components/pages/repadd';
// import EditRep from './components/reps/edit-rep';
import EditRepComponent from './components/pages/repedit';
// import DepartureByDate from './components/contacts/departureByDate';
import DeparturePage from './components/pages/departures';
import HomeContacts from './components/contacts/home/index.jsx';
// import ErrorPage from './components/core/error-page';
import ErrorPage from './components/pages/error';
import PopupMessage from './components/contacts/shared/popup-message';
// import ArrivalByDate from './components/contacts/arrivalByDate';
import ArrivalsPage from './components/pages/arivals';
import Material from './components/material';
const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {/* <AuthContext> */}
        <Route path="/" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/login" render={!loggedIn ? () => <LoginPage /> : () => <RepsListPage />} />
        <Route path="/admin/reps/list" render={loggedIn ? () => <RepsListPage /> : () => <LoginPage />} />
        <Route
          path="/admin/reps/add-hotel/:repId"
          render={loggedIn ? () => <RepAddHotelPage /> : () => <LoginPage />}
        />
        <Route path="/admin/reps/add-rep" render={loggedIn ? () => <RepAddPage /> : () => <LoginPage />} />
        <Route path="/admin/reps/edit-rep/:repId" component={EditRepComponent} />
        <Route path="/admin/material" component={Material} />
        <Route
          path="/admin/bulk-sms/message-info/:messageId"
          render={loggedIn ? () => <PopupMessage /> : () => <LoginPage />}
        />
        <Route path="/admin/register" component={Register} />
        <Route path="/admin/logout" component={Logout} />
        <Route path="/admin" exact render={!loggedIn ? () => <Home /> : () => <HomeAuth />} />
        <Route path="/admin/transfer/departure/:date" component={DeparturePage} />
        <Route path="/admin/contacts/home/" render={loggedIn ? () => <HomeContacts /> : () => <LoginPage />} />
        <Route path="/admin/contacts/departure/" render={loggedIn ? () => <DeparturePage /> : () => <LoginPage />} />
        <Route path="/admin/contacts/arrival" render={loggedIn ? () => <ArrivalsPage /> : () => <LoginPage />} />
        <Route path="*" render={() => <ErrorPage msg="Page not Found - 404" />} />

        {/* </AuthContext> */}
      </Switch>
    </BrowserRouter>
  );
};
export default Navigation;
