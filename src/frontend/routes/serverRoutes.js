import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const serverRoutes = (isLogged) => {
  return [
    {
      path: '/',
      exact: true,
      component: isLogged ? Home : Login,
    },
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/register',
      exact: true,
      component: Register,
    },
  ];
};

export default serverRoutes;
