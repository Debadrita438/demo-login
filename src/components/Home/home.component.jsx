import Card from '../UI/Card/card.component';

import classes from './home.module.css';

const Home = ({ onLogOut }) => {
    return ( 
        <Card className={classes.home}>
            <h1>Welcome to Home Page!</h1>
        </Card>
    );
}
 
export default Home;