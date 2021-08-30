import { forwardRef, useImperativeHandle, useRef } from 'react';
import classes from './input-field.module.css';

const InputField = forwardRef(({ label, isValid, id, type, onChange, onBlur }, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return{
            focus: activate
        }
    })

    return ( 
        <div className={`${classes.control} ${isValid === false ? classes.invalid : ''}`}>
            <label htmlFor={id}>{label}</label>
            <input ref={inputRef} id={id} type={type} onChange={onChange} onBlur={onBlur} />
        </div>
    );
});
 
export default InputField;