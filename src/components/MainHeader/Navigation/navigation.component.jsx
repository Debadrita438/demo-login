import AuthContext from '../../../store/auth-context';
import classes from './navigation.module.css';

const Navigation = ({ isLoggedIn, onLoggedOut }) => {
    return ( 
        <AuthContext.Consumer>
            {ctx => {
                return(
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
                                    <button onClick={onLoggedOut}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )
            }}
        </AuthContext.Consumer>
    );
}
 
export default Navigation;