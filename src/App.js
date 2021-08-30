import { Fragment, useContext } from 'react';

import MainHeader from './components/MainHeader/MainHeader/main-header.component';
import Home from './components/Home/home.component';
import Login from './components/Login/login.component';
import AuthContext from './store/auth-context';

const App = () => {
  const ctx = useContext(AuthContext);

  return ( 
      <Fragment>
        <MainHeader />
        <main>
          {
            ctx.isLoggedIn ? <Home /> : <Login />
          }
        </main>
      </Fragment>
  );
}


 
export default App;