import { classNames } from "../../lib/util"
import styles from "../../styles/utils.module.css"

export function Button(props) {
    const buttonClasses = classNames({
        [styles.buttonPrimary]: props.primary,
        [styles.buttonSecondary]: props.secondary,        
        [props.className]: true,    
    })

    const wrapperClasses = classNames({
        [props.wrapperClasses]: props.wrapperClasses
    })
    return <div className={wrapperClasses}>
        <button
            type={props.type || 'button'}
            onClick={() => props.onClick()}
            className={buttonClasses}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    </div>
}