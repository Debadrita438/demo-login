import classes from './button.module.css';

const Button = ({ onClick, type, children, disabled }) => {
    return (
        <button 
            onClick={onClick} 
            type={type || 'button'} 
            className={classes.button}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
 
export default Button;