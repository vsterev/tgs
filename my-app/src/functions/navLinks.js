const getNavigations = (isLogged, user) => {
  const authLinks = [
    {
      title: 'Arrivals',
      path: '/admin/contacts/arrival',
    },
    {
      title: 'Departures',
      path: '/admin/contacts/departure',
    },
    {
      title: 'Reprasentatives',
      path: '/admin/reps/list',
    },
    {
      title: 'bulkSMS',
      path: '/admin/bulk-sms/profile',
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
      title: 'Login',
      path: '/admin',
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
