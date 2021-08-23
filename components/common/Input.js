import { classNames } from "../../lib/util"
import styles from "../../styles/form.module.css"
import utilStyles from "../../styles/utils.module.css"

export function Input(props) {

    let inputClasses = classNames({
      [styles.input]: true,
      [styles.inputNumber]: props.type === 'number',
      [styles.incrementerInput]: props.withIncrement,
      [utilStyles.fullWidth]: props.maxWidth,
      [props.className]: true
    })

    const inputNumberwrapperClasses = classNames({
        [utilStyles.displayFlex]: true,
    })

    const onNumberInputKeyPress = (event) => { 
        if (event.which != 8 && event.which != 0 && event.which < 48 || event.which > 57) {
            event.preventDefault()
        }
    }

    const onChange = (event) => { 
        let value = event.target.value
        event.target.value = event.target.value.replace(/[\e\+\-\.]/g, "")
        if (event.target.value.charAt(0) === "0") {
            event.target.value = event.target.value.substring(1);
        }
        if (event.key < 31 && (event.key > 48 || event.key < 57)) return
        if (Number(value) < Number(props.min) || Number(value > Number(props.max))) {
            event.target.value = value.substring(0, value.length - 1);    
        }
        props.onChange && props.onChange({name: props.name, value: Number(value)})
    }
    
    const labelStyles = classNames({
        [styles.disabled]: props.disabled,
        [styles.label]: true
    })

    let wrapperStyles = classNames({
        [styles.input]: true,
        [utilStyles.fullWidth]: props.maxWidth
    })

    if (props.maxWidth) {
        wrapperStyles = `${wrapperStyles} ${utilStyles.fullWidth}`
    }
    
    if (props.classes && props.classes.wrapper) {
        wrapperStyles =  `${wrapperStyles} ${props.classes.wrapper}`
    }

    if (props.classes && props.classes.element) {
        inputClasses =  `${inputClasses} ${props.classes.element}`
    }
    
    const onNumberInputKeyDown = (event) => { 
        let value = event.target.value
        props.onKeyDown && props.onKeyDown({name: props.name, value: Number(value), eventKey: event.key})
    }
    return <div className={wrapperStyles}>
            <label
                className={labelStyles}
                htmlFor={props.name}>
                    {props.required ? '*' : null}
                    {props.label}                
            </label>
            {/* Input type number */}
            {props.type === 'number' && <div className={inputNumberwrapperClasses}>
            <input
                disabled={props.disabled}
                id={props.name}
                onChange={onChange}
                name={props.name}
                placeholder={props.placeholder}
                type="number"
                value={props.value}
                required={props.required}
                min={props.min}
                max={props.max}
                maxLength={props.maxLength}
                className={inputClasses}
                onKeyDown={onNumberInputKeyDown}
                onKeyPress={onNumberInputKeyPress}
            />
            </div>}
            {/* Input type number */}

            {/* Input type text */}
            {!props.type && <input
                disabled={props.disabled}
                id={props.name}
                onChange={props.onChange}
                name={props.name}
                type={'text'}
                value={props.value}
                placeholder={props.placeholder}
                required={props.required}
                min={props.min}
                max={props.max}
                onKeyDown={props.onKeyDown}
                maxLength={props.maxLength}
                className={inputClasses}
            />}      
         
            </div>
}