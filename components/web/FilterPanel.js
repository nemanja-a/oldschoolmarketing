import { useState } from 'react'
import { classNames } from '../../lib/util'
import style from "../../styles/filterpanel.module.css"
import detectDevice from '../common/DeviceDetect'


export function FilterPanel({ onChange, selected, items, grouped, type }) {
  const [state, setState] = useState({ selected, items })

  const isMobile = detectDevice()
  const toggleMenu = (groupItem, event) => {
    state.activeDOMElement && state.activeDOMElement.classList.remove([style.activeMenu])
    groupItem = (state.activeMenu && groupItem === state.activeMenu) ? null : groupItem
    let newActiveDOMElement = event.target
    newActiveDOMElement = newActiveDOMElement.closest('ul')
    newActiveDOMElement.classList.add([style.activeMenu])
    setState({ ...state, activeMenu: groupItem, activeDOMElement: newActiveDOMElement })
  }

  const applyFilter = (filters) => {
    filters[type] = filters.displayValue
    setState({ ...state, selected: filters })
    onChange(filters)
  }

  const containerStyles = classNames({
    [style.container]: true,
    [style.fontCursive]: !isMobile
  })
  return (
    <div className={containerStyles} style={{ boxShadow: "none !important" }}>
      <div className={style.panel}>
        {grouped ? state.items.map((item, index) => {
          const listItemClasses = classNames({
            [style.listItem]: item.displayValue !== selected,
            [style.active]: item.displayValue === selected
          })
          const arrowClasses = classNames({
            [style.icon]: true,
            [style.iconActive]: state.activeMenu && (item.displayValue === state.activeMenu.displayValue)
          })
          return <ul key={index} className={listItemClasses}>
            <span onClick={(event) => item.subcategories ? toggleMenu(item, event) : applyFilter(item)}>
              {item.displayValue}
              {item.subcategories && <img className={arrowClasses} src="/images/arrow_white.png" />}
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
          })}
      </div>
    </div>
  )
}