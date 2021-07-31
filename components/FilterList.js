import utilStyles from "../styles/utils.module.css"
import { useState } from "react"
export function FilterList({onChange, items, title}) {
    const [state, setState] = useState({
        item: {}
    })

    const onItemClicked = (selectedItem, event) => {   
        if (selectedItem.value !== state.item.value) {
          state.activeDOMElement && state.activeDOMElement.classList.remove([utilStyles.activeFilter])
          const newActiveDOMElement = event.target
          newActiveDOMElement.classList.add([utilStyles.activeFilter])
          selectedItem.active = true
          setState({
            item: selectedItem,
            activeDOMElement: newActiveDOMElement
          })
        } else {
          if (selectedItem.subcategories) {
            selectedItem.active = true
            selectedItem.showSubcategories = !selectedItem.showSubcategories
            setState({item: selectedItem})
          }
        }
        onChange(selectedItem)
      }
    
      const onSubcategoryClicked = (selectedSubcategory, event) => { 
        event.stopPropagation()
      }
    
      const renderFilterItems = () => { 
        return items.map((item, index) => {      
          return <span key={index} id={item.value} className={utilStyles.filterItem}
                  onClick={(event) => onItemClicked(item, event)}>    
              <span>{item.subcategories ? `${item.displayValue} +` : item.displayValue}</span>
              {(item.active && item.showSubcategories) && <span>{renderSubcategories(item)}</span>}
            </span>                                                         
          })
      }
    
      const renderSubcategories = (item) => { 
        return item.subcategories.map((subcategory, subcategoryIndex) => { 
          return <span key={subcategoryIndex} className={utilStyles.subcategory} 
          onClick={(event) => onSubcategoryClicked(subcategory, event)}
          >{subcategory.displayValue}</span>
       })
      }

  return ( <div>
            <div>{title}:</div>
            <div className={utilStyles.filterListWrapper}>{renderFilterItems()}</div>
        </div>
  )
}