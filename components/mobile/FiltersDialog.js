import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import style from "../../styles/filtersdialog.module.css"
import utilstyles from "../../styles/utils.module.css"
import FadeIn from 'react-fade-in';
import { classNames, getSelectOptions, getSelectStyles } from '../../lib/util'
import { Button } from '../common/Button'
import { Select } from '../common/Select'
import { WEBSITE } from '../../util/variables'

export function FiltersDialog() {
  const [state, setState] = useState({
      showDialog: false,
  })
  const close = () => { setState({...state, showDialog: false}) }
  const open = () => { setState({...state, showDialog: true}) }
  const applyFilters = () => { }

  const onSelect = (selectedList, controlName) => {
    setState({...state, [controlName]: selectedList })
  }

  const onRemove = (selectedList, controlName ) => {
    setState({...state, [controlName]: selectedList })
  }

  const countryOptions = getSelectOptions(WEBSITE.COUNTRIES)
  const categoryOptions = getSelectOptions(WEBSITE.CATEGORIES)
  const selectStyles = getSelectStyles()

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
      <Dialog className={style.dialog} aria-label="add-website-dialog" isOpen={state.showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <button className={utilstyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          <div className={style.title}>Filters</div> 

          <div className={style.row}>
            <Select                        
              maxWidth
              showCheckbox
              id="categoriesSelect"
              label="Categories"
              placeholder="Select website categories..."  
              groupBy="categoryId"
              name="categories"                                                              
              options={categoryOptions}
              onSelect={(selectedList) => onSelect(selectedList, 'categories')}
              onRemove={(selectedList) => onRemove(selectedList, 'categories')}
              selectedValues={state.categories}
              style={selectStyles}              
            />                        
          </div>
          {state.validationError && !state.website.categories.length && <div className={dialogStyles.row}>
             <span className={utilStyles.error}>Select one or more categories</span>
          </div>}
          <div className={style.row}>
            <Select            
              maxWidth
              id="countriesSelect"
              showCheckbox
              label="Countries"
              placeholder="Select website countries..."              
              options={countryOptions}
              name="countries"
              onSelect={(selectedList) => onSelect(selectedList, 'countries')}
              onRemove={(selectedList) => onRemove(selectedList, 'countries')}
              onRemove={onRemove}              
              selectedValues={state.countries}
              style={selectStyles}              
            />                        
          </div>
        <Button primary onClick={applyFilters}>Apply filters</Button>
      </FadeIn>
      </Dialog>
    </div>
  )
}