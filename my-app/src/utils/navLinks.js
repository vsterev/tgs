const getNavigations = (isLogged, user) => {
  const authLinks = [
    {
      title: 'home',
      path: '/',
    },
    {
      title: 'Profile',
      path: `/profile/${user && user.userId}`,
      // path: userid && `/profile/${userid}` || '/profile'
    },
    {
      title: 'Reprasentatives',
      path: '/rep/list',
    },
    {
      title: 'Logout',
      path: '/logout',
    },
  ];
  const guestLinks = [
    {
      title: 'Login',
      path: '/login',
    },
    {
      title: 'Register',
      path: '/register',
    },
    {
      title: 'Info',
      path: '/info',
    },
  ];
  return isLogged ? authLinks : guestLinks;
  // return authLinks
};
export default getNavigations;
