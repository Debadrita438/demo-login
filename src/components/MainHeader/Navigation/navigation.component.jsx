import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import classes from './navigation.module.css';

const Navigation = () => {
    const ctx = useContext(AuthContext);

    return ( 
        <nav className={classes.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogOut}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
 
export default Navigation;