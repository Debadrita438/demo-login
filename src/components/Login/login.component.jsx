import { useContext, useEffect, useReducer, useRef, useState } from 'react';

import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/card.component';
import Button from '../UI/Button/button.component';
import InputField from '../UI/InputField/input-field.component';

import classes from './login.module.css';

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

    const authCtx = useContext(AuthContext);

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setIsFormValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log('CLEANUP!');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const setEmailHandler = event => {
        dispatchEmail({
            type: 'USER_EMAIL',
            payload: event.target.value
        });
        setIsFormValid(event.target.value.includes('@') && passwordIsValid);
    }

    const setPasswordHandler = event => {
        dispatchPassword({
            type: 'USER_PASSWORD',
            payload: event.target.value
        });

        setIsFormValid(emailIsValid && event.target.value.trim().length > 6);
    }

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    }

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        if(isFormValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    }

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    return ( 
        <Card className={classes.login}>
            <form onSubmit={formSubmitHandler}>
                <InputField
                    ref={emailInputRef}
                    label='E-Mail'
                    isValid={emailIsValid}
                    id='email'
                    type='email'
                    onChange={setEmailHandler}
                    onBlur={validateEmailHandler}
                />

                <InputField
                    ref={passwordInputRef}
                    label='Password'
                    isValid={passwordIsValid}
                    id='password'
                    type='password'
                    onChange={setPasswordHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </Card>
    );
}
 
export default Login;