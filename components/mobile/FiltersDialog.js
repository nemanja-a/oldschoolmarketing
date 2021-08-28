import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import style from "../../styles/filters.module.css"
import dialogStyles from "../../styles/dialog.module.css"
import utilstyles from "../../styles/utils.module.css"
import FadeIn from 'react-fade-in';
import { classNames, getFilters } from '../../lib/util'
import { Button } from '../common/Button'
import { WEBSITE } from '../../util/variables'
import { FilterPanel } from './FilterPanel'

export function FiltersDialog({ onChange, selectedCountry, selectedCategory }) {
  const [state, setState] = useState({
    showDialog: false,
  })
  const close = () => { setState({ ...state, showDialog: false }) }
  const open = () => { setState({ ...state, showDialog: true }) }

  const categories = getFilters(WEBSITE.CATEGORIES)

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
            <div className={style.subtitle}>Categories</div>
            <FilterPanel
              onChange={onChange}
              selected={selectedCategory}
              id="categoryFilter"
              items={categories}
              grouped
              type="category"
            />
          </div>
          <div className={style.row}>
            <div className={style.subtitle}>Countries</div>
            <FilterPanel
              onChange={onChange}
              selected={selectedCountry}
              id="countryFilter"
              items={WEBSITE.COUNTRIES}
              type="country"
            />
          </div>
        </FadeIn>
      </Dialog>
    </div>
  )
}