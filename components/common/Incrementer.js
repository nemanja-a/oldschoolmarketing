import incrementerStyles from "../../styles/incrementer.module.css"
import formStyles from "../../styles/form.module.css"
import { RepeatableButton } from "./RepeatableButton"

export function Incrementer(props) {

    return <div className={formStyles.formField}>
        <div className={formStyles.inputWrapper}>
            <label className={props.disabled ? formStyles.disabled : null} htmlFor={props.name}>{props.label} {props.required ? '*' : null}</label>
            <div className={incrementerStyles.buttons}>
                <RepeatableButton disabled={props.disabled} onClick={props.onUpClick} onHold={props.onUpClick}>▲</RepeatableButton>
                <RepeatableButton disabled={props.disabled} onClick={props.onDownClick} onHold={props.onDownClick}>▼</RepeatableButton>
            </div>
        </div>
    </div>
}