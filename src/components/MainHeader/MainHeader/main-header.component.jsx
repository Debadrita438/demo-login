import Navigation from "../Navigation/navigation.component"

import classes from './main-header.module.css';

const MainHeader = () => {
    return ( 
        <header className={classes['main-header']}>
            <h1>A Typical Page</h1>
            <Navigation />
        </header>
    );
}
 
export default MainHeader;