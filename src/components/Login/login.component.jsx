import { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/card.component';
import Button from '../UI/Button/button.component';

import classes from './login.module.css';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
    switch(action.type) {
        case 'USER_EMAIL': 
            return {
                value: action.payload, 
                isValid: action.payload.includes('@')
            }
        case 'INPUT_BLUR':
            return {
                value: state.value, 
                isValid: state.value.includes('@')
            }
        default: 
            return {
                value: '', 
                isValid: false
            }
    }
}

const passwordReducer = (state, action) => {
    switch(action.type) {
        case 'USER_PASSWORD': 
            return {
                value: action.payload,
                isValid: action.payload.trim().length > 6
            }
        case 'INPUT_BLUR':
            return {
                value: state.value,
                isValid: state.value.trim().length > 6
            }
        default: 
            return {
                value: '', 
                isValid: false
            }
    }
}

const Login = () => {
    const [isFormValid, setIsFormValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, { 
        value: '', 
        isValid: null
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    });

    const loginCtx = useContext(AuthContext);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setIsFormValid(emailState.isValid && passwordState.isValid);
        }, 500);

        return () => {
            console.log('CLEANUP!');
            clearTimeout(identifier);
        };
    }, [emailState.isValid, passwordState.isValid]);

    const setEmailHandler = event => {
        dispatchEmail({
            type: 'USER_EMAIL',
            payload: event.target.value
        });
        setIsFormValid(event.target.value.includes('@') && passwordState.isValid);
    }

    const setPasswordHandler = event => {
        dispatchPassword({
            type: 'USER_PASSWORD',
            payload: event.target.value
        });

        setIsFormValid(emailState.isValid && event.target.value.trim().length > 6);
    }

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    }

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        loginCtx.onLogin(emailState.value, passwordState.value);
    }

    return ( 
        <Card className={classes.login}>
            <form onSubmit={formSubmitHandler}>
                <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        id='email' 
                        type="email" 
                        onChange={setEmailHandler}
                        onBlur={validateEmailHandler} 
                    />
                </div>

                <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
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