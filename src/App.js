import { Fragment, useState } from 'react';

import MainHeader from './components/MainHeader/MainHeader/main-header.component';
import Home from './components/Home/home.component';
import Login from './components/Login/login.component';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  return ( 
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLoggedOut={logoutHandler} />
      <main>
        {
          isLoggedIn ? <Home onLogOut={logoutHandler} /> : <Login onLoggedIn={loginHandler} />
        }
      </main>
    </Fragment>
  );
}
 
export default App;