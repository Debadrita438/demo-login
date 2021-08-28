import Navigation from "../Navigation/navigation.component"

import classes from './main-header.module.css';

const MainHeader = ({ isAuthenticated, onLoggedOut }) => {
    return ( 
        <header className={classes['main-header']}>
            <h1>A Typical Page</h1>
            <Navigation isLoggedIn={isAuthenticated} onLoggedOut={onLoggedOut} />
        </header>
    );
}
 
export default MainHeader;