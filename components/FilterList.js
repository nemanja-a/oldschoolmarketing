import utilStyles from "../styles/utils.module.css"
import { useEffect, useRef, useState } from "react"

export function FilterList({onChange, items, title, id}) {
    const searchInputRef = useRef()
    const filteredItems = JSON.parse(JSON.stringify(items)) 
    const defaultState = {
      item: {},
      activeGroupItem: {},
      filteredItems
    }

    const [state, setState] = useState(defaultState)

    const onItemClicked = (selectedItem, event) => {   
        if (selectedItem.value !== state.item.value) {
          state.activeDOMElement && state.activeDOMElement.classList.remove([utilStyles.activeFilter])
          const newActiveDOMElement = event.target
          newActiveDOMElement.classList.add([utilStyles.activeFilter])
          selectedItem.active = true
          searchInputRef.current.value = selectedItem.displayValue
          setState({
            ...state,
            item: selectedItem,
            activeDOMElement: newActiveDOMElement
          })
        } else {
          if (selectedItem.subcategories) {
            selectedItem.active = true
            selectedItem.showSubcategories = !selectedItem.showSubcategories
            setState({...state, item: selectedItem})
          }
        }
        onChange(selectedItem)
      }

      const onGroupItemClicked = (groupItem) => { 
        if (groupItem.value !== state.activeGroupItem.value) {
          state.activeDOMElement && state.activeDOMElement.classList.remove([utilStyles.activeFilter])
          const newActiveDOMElement = event.target
          newActiveDOMElement.classList.add([utilStyles.activeFilter])
          setState({...state, activeGroupItem: groupItem, activeDOMElement: newActiveDOMElement})
        } else { 
          state.activeDOMElement.classList.remove([utilStyles.activeFilter])
          setState({defaultState})
        }
      }

      const onInput = (event) => {
        if (!event.currentTarget.value) {
          state.activeDOMElement && state.activeDOMElement.classList.remove([utilStyles.activeFilter])
          setState({test: "This is test"})          
          onChange({})
        }  }
    
      const onSubcategoryClicked = (selectedSubcategory, event) => { 
        event.stopPropagation()
      }
    
      const renderFilterItems = () => { 
        return state.filteredItems.map((item, index) => {     
          return !item.subcategories ? <span key={index} id={item.value} className={utilStyles.filterItem}
                  onClick={(event) => onItemClicked(item, event)}>    
              <span>{item.displayValue}</span>
            </span>
             :
            <span key={index} id={item.value}
              onClick={(event) => onGroupItemClicked(item,event)}>
              <span className={utilStyles.filterItem}>{item.displayValue} +</span> 
              {(state.activeGroupItem.value === item.value) && <span>{renderSubcategories(item)}</span>}
            </span>                                                        
          })
      }

      const onSearchChange = (event) => { 
        const value = event.target.value
        state.filteredItems = items.filter(item => { 
          return item.displayValue.includes(value)
        })
        setState({...defaultState, filteredItems: state.filteredItems})
      }
    
      const renderSubcategories = (item) => { 
        return item.subcategories.map((subcategory, subcategoryIndex) => { 
          return <span key={subcategoryIndex} className={utilStyles.subcategory} 
          onClick={(event) => onSubcategoryClicked(subcategory, event)}
          >{subcategory.displayValue}</span>
       })
      }

  return ( <div id={id} style={{border: "1px solid lightgrey", borderRadius: "5px", boxShadow: "0px 0px 5px 0px"}}>
            <div>{title}: {state.item.displayValue ? state.item.displayValue : 'All'}</div>
            <input ref={searchInputRef} type="search" onInput={onInput}
             placeholder={`Search  ${title}`} value={state.searchString} onChange={onSearchChange} 
             />
            <div className={utilStyles.filterListWrapper}>{renderFilterItems()}</div>
        </div>
  )
}