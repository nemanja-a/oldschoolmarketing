import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import style from "../../styles/filtersdialog.module.css"
import dialogStyles from "../../styles/dialog.module.css"
import utilstyles from "../../styles/utils.module.css"
import FadeIn from 'react-fade-in';
import { classNames, getSelectOptions, getSelectStyles } from '../../lib/util'
import { Button } from '../common/Button'
import { Select } from '../common/Select'
import { WEBSITE } from '../../util/variables'

export function FiltersDialog({onChange, selectedCountry, selectedCategory}) {  
  const [state, setState] = useState({
      showDialog: false,
  })
  const close = () => { setState({...state, showDialog: false}) }
  const open = () => { setState({...state, showDialog: true}) }
  const applyFilters = () => {
    let filters = {}
    if (state.country) filters.country = state.country
    if (state.category) filters.category = state.category 
    setState({...state, showDialog: false})
    onChange(filters)
  }

  const onSelect = (selectedList, controlName) => {
    setState({...state, [controlName]: selectedList })
  }

  const onRemove = (selectedList, controlName ) => {
    setState({...state, [controlName]: selectedList })
  }

  const countryOptions = getSelectOptions(WEBSITE.COUNTRIES)
  const categoryOptions = getSelectOptions(WEBSITE.CATEGORIES)
  const selectStyles = getSelectStyles()

  const filtersdialogClasses = classNames({
    [dialogStyles.containerMedium]: true,
    [utilstyles.fontMedium]: true
  })

  return (
    <div className={style.buttonWrapper}>      
      <Button 
        primary
        onClick={open}
        className={style.filtersButton}        
      >
        Filters
      </Button>      
      {/* Dialog */}
      <Dialog className={filtersdialogClasses} aria-label="add-website-dialog" isOpen={state.showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <button className={utilstyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          <h2 className={style.title}>Filters</h2>
          <div className={style.row}>
            <Select                        
              maxWidth
              showCheckbox
              id="categorySelect"
              label="Category"
              placeholder="Select one category"  
              groupBy="categoryId"
              name="category"                                                              
              options={categoryOptions}
              onSelect={(selectedList) => onSelect(selectedList, 'category')}
              onRemove={(selectedList) => onRemove(selectedList, 'category')}
              selectedValues={selectedCategory}
              style={selectStyles}
              selectionLimit={1}
            />                        
          </div>
          {state.validationError && !state.website.categories.length && <div className={dialogStyles.row}>
             <span className={utilStyles.error}>Select one or more categories</span>
          </div>}
          <div className={style.row}>
            <Select            
              maxWidth
              showCheckbox
              id="countrySelect"              
              label="Country"
              placeholder="Select one country"              
              options={countryOptions}
              name="country"
              onSelect={(selectedList) => onSelect(selectedList, 'country')}
              onRemove={(selectedList) => onRemove(selectedList, 'country')}
              onRemove={onRemove}              
              selectedValues={selectedCountry}
              style={selectStyles}      
              selectionLimit={1}
            />                        
          </div>
          <div style={{textAlign: "center"}}>
          <Button className={style.applyFiltersButton} primary onClick={applyFilters}>Apply filters</Button>
          </div>
        
      </FadeIn>
      </Dialog>
    </div>
  )
}