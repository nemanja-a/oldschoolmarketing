import { classNames } from "../../lib/util"
import styles from "../../styles/form.module.css"
import utilStyles from "../../styles/utils.module.css"
import Multiselect from 'multiselect-react-dropdown'

export function Select(props) {
        const labelStyles = classNames({
        [styles.disabled]: props.disabled,
        [styles.label]: true
    })

    let wrapperStyles = classNames({
        [styles.input]: true,
        [utilStyles.fullWidth]: props.maxWidth,
        [props.className]: true
    })

    return <div className={wrapperStyles} id={props.id}>
            <label className={labelStyles} htmlFor={props.name}>
                {props.required ? '*' : null}
                {props.label}            
            </label>
            <Multiselect
                options={props.options} 
                selectedValues={props.selectedValues}
                placeholder={props.placeholder}
                onSelect={props.onSelect}
                name={props.name}
                onRemove={props.onRemove}            
                displayValue="displayValue"
                showCheckbox={props.showCheckbox}
                singleSelect={props.singleSelect}
                style={props.style}
                closeOnSelect={false}
                avoidHighlightFirstOption={true}
                hidePlaceholder={true}
                showArrow={true}
                className={utilStyles.formControllError}  
                groupBy={props.groupBy}      
                selectionLimit={props.selectionLimit}
            />
        </div>
}