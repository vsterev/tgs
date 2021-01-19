const getNavigations = (isLogged, user) => {
  const authLinks = [
    {
      title: 'reps',
      path: '/admin/reps/all',
    },
    {
      title: 'departures',
      path: '/admin/contacts/departures',
    },
    {
      title: 'arrivals',
      path: '/admin/contacts/arrivals',
    },
    {
      title: 'bulkSMS',
      path: '/admin/bulkSMS',
    },
    // {
    //     title: 'Profile',
    //     path: `/profile/${user && user.userId}`
    //     // path: userid && `/profile/${userid}` || '/profile'
    // },
    {
      title: 'Logout',
      path: '/logout',
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
