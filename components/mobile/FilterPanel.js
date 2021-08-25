import { useState } from 'react'
import { classNames } from '../../lib/util'
import style from "../../styles/filterpanel.module.css"

export function FilterPanel({onChange, selected, items, grouped, type}) {  
  const [state, setState] = useState({ selected, items})     

  const toggleMenu = (groupItem) => {
    groupItem = (state.activeMenu && groupItem === state.activeMenu) ? null : groupItem
    setState({...state, activeMenu: groupItem}) 
  }

  const applyFilter = (filters) => {
    filters[type] = filters.displayValue         
    onChange(filters)
  }

  return (
      <div className={style.container}>
          <div className={style.panel}>
              {grouped ? state.items.map((item, index) => {
                  const listItemClasses = classNames({
                    [style.listItem]: true,
                    [style.active]: item.displayValue === selected 
                  })
                  const arrowClasses = classNames({
                    [style.icon]: true,
                    [style.iconActive]: state.activeMenu && (item.displayValue === state.activeMenu.displayValue)
                  })
                  return <ul key={index} className={listItemClasses}>
                      <span onClick={() => item.subcategories ? toggleMenu(item) : applyFilter(item)}>                      
                        {item.displayValue}
                        {item.subcategories && <img className={arrowClasses} src="/images/arrow.svg" />}
                      </span>                    
                    {(state.activeMenu && (state.activeMenu.displayValue === item.categoryIndex) && item.subcategories) &&
                    <div className={style.subcategories}>
                        {item.subcategories.map((subcategory, subcategoryIndex) => { 
                            const subcategoryClasses = classNames({                            
                              [style.active]: subcategory.displayValue === selected 
                            })
                            return <li key={subcategoryIndex} className={subcategoryClasses} onClick={() => applyFilter(subcategory)}>{subcategory.displayValue}</li>
                        })}
                    </div>}
                  </ul>
              })
              :
              state.items.map((item, index) => { 
                const listItemClasses = classNames({
                  [style.listItem]: true,
                  [style.ungroupedListItem]: true,
                  [style.active]: item.displayValue === selected 
                })
                return <li key={index} className={listItemClasses} onClick={() => applyFilter(item)}>{item.displayValue}</li>
              }) }
          </div>
      </div>
  )
}