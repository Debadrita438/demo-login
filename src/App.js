import { useEffect, useState } from 'react';

import MainHeader from './components/MainHeader/MainHeader/main-header.component';
import Home from './components/Home/home.component';
import Login from './components/Login/login.component';
import AuthContext from './store/auth-context';

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
    <AuthContext.Provider value={{ isLoggedIn }}>
      <MainHeader onLoggedOut={logoutHandler} />
      <main>
        {
          isLoggedIn ? <Home onLogOut={logoutHandler} /> : <Login onLoggedIn={loginHandler} />
        }
      </main>
    </AuthContext.Provider>
  );
}

// We have to send value prop in the provider because auth-context has defaultValue. In case of defaultValue you don't need provider to pass down context for the consumer to consume. That is why here the app crashes.
// In order not to let the app crash we passed isLoggedIn(context api): isLoggedIn(state) in the value prop.
 
export default App;