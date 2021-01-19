const getNavigations = (isLogged, user) => {
  const authLinks = [
    {
      title: 'Reprasentatives',
      path: '/admin/reps/list',
    },
    {
      title: 'Departures',
      path: '/admin/contacts/departure',
    },
    {
      title: 'Arrivals',
      path: '/admin/contacts/arrival',
    },
    {
      title: 'bulkSMS',
      path: '/admin/bulkSMS',
    },
    {
      title: 'System',
      path: '/admin/system',
    },
    // {
    //     title: 'Profile',
    //     path: `/profile/${user && user.userId}`
    //     // path: userid && `/profile/${userid}` || '/profile'
    // },
    {
      title: 'Logout',
      path: '/admin/logout',
    },
  ];
  const guestLinks = [
    {
      title: 'Villas',
      path: '/',
    },
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
