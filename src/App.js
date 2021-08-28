import { Fragment, useEffect, useState } from 'react';

import MainHeader from './components/MainHeader/MainHeader/main-header.component';
import Home from './components/Home/home.component';
import Login from './components/Login/login.component';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  
    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
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