import { useEffect, useState } from 'react';

import Card from '../UI/Card/card.component';
import Button from '../UI/Button/button.component';

import classes from './login.module.css';

const Login = ({ onLoggedIn }) => {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState();
    const [isPasswordValid, setIsPasswordValid] = useState();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const identifier = setTimeout(() => {
            setIsFormValid(newEmail.includes('@') && newPassword.trim().length > 6);
            console.log('Checking form validity!');
        }, 500);
        
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        }
    }, [newEmail, newPassword])

    // This way we can lessen the number of http request to the server instead of doing it at every key stroke

    const setEmailHandler = event => {
        setNewEmail(event.target.value);
    }

    const setPasswordHandler = event => {
        setNewPassword(event.target.value);
    }

    const validateEmailHandler = () => {
        // setIsEmailValid(newEmail.includes('@'));
        if(newEmail.includes('@')) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    const validatePasswordHandler = () => {
        setIsPasswordValid(newPassword.trim().length > 6);
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        onLoggedIn(newEmail, newPassword);
    }

    return ( 
        <Card className={classes.login}>
            <form onSubmit={formSubmitHandler}>
                <div className={`${classes.control} ${isEmailValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        id='email' 
                        type="email" 
                        onChange={setEmailHandler} 
                        onBlur={validateEmailHandler} 
                    />
                </div>

                <div className={`${classes.control} ${isPasswordValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input 
                        id='password' 
                        type="password" 
                        onChange={setPasswordHandler} 
                        onBlur={validatePasswordHandler} 
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" disabled={!isFormValid}>Login</Button>
                </div>
            </form>
        </Card>
    );
}
 
export default Login;