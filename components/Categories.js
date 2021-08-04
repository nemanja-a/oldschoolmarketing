import { Select } from "./common/Select"
import { WEBSITE } from "../util/variables"
import { forwardRef } from "react"

export const Categories = forwardRef((props, ref) => {
    debugger
    <Select
      required            
      maxWidth
      showCheckbox
      label='Categories'
      placeholder="Select website categories"                                                                 
      options={WEBSITE.CATEGORIES}
      onSelect={(selectedList) => onSelect(selectedList, 'categories')}
      onRemove={(selectedList) => onRemove(selectedList, 'categories')}
      selectedValues={props.selectedValues}
      style={props.selectStyles}
      className={props.classes}
      ref={ref}
    />    
  })