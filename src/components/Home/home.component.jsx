import { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/button.component';
import Card from '../UI/Card/card.component';

import classes from './home.module.css';

const Home = () => {
    const authCtx = useContext(AuthContext);

    return ( 
        <Card className={classes.home}>
            <h1>Welcome to Home Page!</h1>
            <Button onClick={authCtx.onLogout}>Logout</Button>
        </Card>
    );
}
 
export default Home;