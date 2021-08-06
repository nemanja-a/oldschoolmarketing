import styles from "../styles/filterlist.module.css"
import React, { useEffect, useState } from "react"
import { classNames } from "../lib/util"

export const FilterList = React.forwardRef((props, ref) => {
  const filteredItems = JSON.parse(JSON.stringify(props.items)) 
  const defaultState = {
    item: {},
    activeGroupItem: {},
    activeSubcategory: {},
    filteredItems
  }

  const [state, setState] = useState(defaultState)

  const onClearFilters = () => { 
    state.activeDOMElement && state.activeDOMElement.classList.remove([styles.activeFilter])
    state.activesubcategoryDOMElement && state.activesubcategoryDOMElement.classList.remove([styles.activeFilter])
    setState(defaultState)
  }

  const onItemClicked = (selectedItem, event) => {   
      if (selectedItem.value !== state.item.value) {
        state.activeDOMElement && state.activeDOMElement.classList.remove([styles.activeFilter])
        const newActiveDOMElement = event.target
        newActiveDOMElement.classList.add([styles.activeFilter])
        selectedItem.active = true
        setState({
          ...state,
          item: selectedItem,            
          activeDOMElement: newActiveDOMElement,
          activeGroupItem: {}
        })
      } else {
        if (selectedItem.subcategories) {
          selectedItem.active = true
          selectedItem.showSubcategories = !selectedItem.showSubcategories
          setState({...state, item: selectedItem})
        }
      }
      props.onChange(selectedItem)
    }

    const onGroupItemClicked = (groupItem) => { 
      if (groupItem.value !== state.activeGroupItem.value) {
        state.activeDOMElement && state.activeDOMElement.classList.remove([styles.activeFilter])
        const newActiveDOMElement = event.target
        newActiveDOMElement.classList.add([styles.activeFilter])
        setState({...state, activeGroupItem: groupItem, activeDOMElement: newActiveDOMElement})
      } else { 
        state.activeDOMElement.classList.remove([styles.activeFilter])
        setState({ item: {}, activeGroupItem: {}, filteredItems
        })
      }
    }

    const onInput = (event) => {
      if (!event.currentTarget.value) {
        state.activeDOMElement && state.activeDOMElement.classList.remove([styles.activeFilter])
        props.onChange({})
      }  }
  
    const onSubcategoryClicked = (selectedSubcategory, event) => { 
      event.stopPropagation()
      if (selectedSubcategory.value !== state.activeSubcategory.value) {
        state.activesubcategoryDOMElement && state.activesubcategoryDOMElement.classList.remove([styles.activeFilter])
        const newActiveSubcategoryDOMElement = event.target
        selectedSubcategory.active = true
        newActiveSubcategoryDOMElement.classList.add([styles.activeFilter])
        setState({...state, item: selectedSubcategory, activesubcategoryDOMElement: newActiveSubcategoryDOMElement})
        props.onChange(selectedSubcategory)
      }
    }
  
    const renderFilterItems = () => { 
      return state.filteredItems.map((item, index) => {     
        return !item.subcategories ? <span key={index} id={item.value} className={styles.filterItem}
                onClick={(event) => onItemClicked(item, event)}>    
            <span>{item.displayValue}</span>
          </span>
           :
          <span key={index} id={item.value}
            onClick={(event) => onGroupItemClicked(item,event)}>
            <span className={styles.filterItem}>{item.displayValue} +</span> 
            {(state.activeGroupItem.value === item.value) && <span>{renderSubcategories(item)}</span>}
          </span>                                                        
        })
    }

    const onSearchChange = (event) => { 
      const value = event.target.value
      state.filteredItems = props.items.filter(item => { 
        return item.displayValue.includes(value)
      })
      if (!value) {
        setState({...defaultState, filteredItems: state.filteredItems})  
      } else {
        setState({...state, filteredItems: state.filteredItems})
      }
    }

    const clearFilters = () => { 
      state.activeDOMElement && state.activeDOMElement.classList.remove([styles.activeFilter])
      state.activesubcategoryDOMElement && state.activesubcategoryDOMElement.classList.remove([styles.activeFilter])
      setState(defaultState)
      props.onChange({})
    }
  
    const renderSubcategories = (item) => { 
      return item.subcategories.map((subcategory, subcategoryIndex) => { 
        return <span key={subcategoryIndex} className={styles.subcategory} 
        onClick={(event) => onSubcategoryClicked(subcategory, event)}
        >{subcategory.displayValue}</span>
     })
    }

    const activeHeaderTitleClasses = classNames({
      [styles.activeHeaderTitle]: state.item.value
    })

return ( <div id={props.id} className={styles.container}>
          <div className={styles.header}>
            <div>{props.title}:</div>
            <div className={styles.activeFilterHeader}>
              <span style={{flex: 1}} className={activeHeaderTitleClasses}>{state.item.displayValue ? state.item.displayValue : 'All'}</span>
              {(state.item.value || state.item.value === 0) && <span className={styles.clearFilterButton} onClick={clearFilters}>x</span>}
              </div>
          </div>
          <input type="search" onInput={onInput}
           placeholder={props.searchPlaceholder} value={state.searchString} onChange={onSearchChange} 
           />
          <div className={styles.filterListWrapper}>{renderFilterItems()}</div>
      </div>
)
})