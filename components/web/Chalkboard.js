import React, { useState } from "react"
import { WebsitesTable } from "../WebsitesTable"
import paginationStyles from "../../styles/pagination.module.css"
import { NAVIGATION_BUTTONS_COUNT, TOTAL_PAGE_COUNT } from "../../util/variables"
import tableStyles from '../../styles/table.module.css'
import { classNames } from "../../lib/util"
import { Input } from "../common/Input"

export function Chalkboard(props) {
  const [state, setState] = useState({
    pageIndex: 0,
    pageRangeStart: 0,
  })

  const handleGoToPageEnterKey = (control) => {
    if (control.eventKey === 'Enter') {
      let pageRangeStart, pageIndex
      if (control.value >= TOTAL_PAGE_COUNT - NAVIGATION_BUTTONS_COUNT && control.value <= TOTAL_PAGE_COUNT) {
        pageRangeStart = TOTAL_PAGE_COUNT - NAVIGATION_BUTTONS_COUNT
        pageIndex = TOTAL_PAGE_COUNT - ((TOTAL_PAGE_COUNT - control.value) + 1)
      } else if (control.value <= TOTAL_PAGE_COUNT) {
        pageRangeStart = pageIndex = control.value - 1
      }
      setState({ ...state, pageRangeStart, pageIndex })
      props.onPageChange(pageIndex)
    }
  }

  const goToPageWrapperClasses = classNames({
    [paginationStyles.goToPageInputWrapper]: true
  })
  const goToPageClasses = {
    wrapper: goToPageWrapperClasses
  }

  const previousButtonDisabled = !state.pageIndex
  const nextButtonDisabled = state.pageIndex > TOTAL_PAGE_COUNT - 1

  const navigationButton = (pageIndex, buttonIndex) => {
    return <button
      id={buttonIndex}
      className={pageIndex === state.pageIndex ? paginationStyles.activePage : null}
      onClick={() => onNavigationButtonClicked(pageIndex)}>{pageIndex + 1}
    </button>
  }
  const onNavigationButtonClicked = (pageIndex) => {
    setState({ ...state, pageIndex })
    props.onPageChange(pageIndex)
  }

  const rangeButton = (text, disabled, onClick) => <button disabled={disabled} onClick={onClick}>{text}</button>
  const onFirstPageClicked = () => {
    setState({ loading: true, pageRangeStart: 0, pageIndex: 0 })
    props.onPageChange(0)
  }
  const onRangeButtonClicked = (pageRangeStart) => {
    setState({ loading: true, pageRangeStart, pageIndex: pageRangeStart })
    props.onPageChange(pageRangeStart)
  }
  const onLastPageClicked = () => {
    setState({ loading: true, pageRangeStart: TOTAL_PAGE_COUNT - NAVIGATION_BUTTONS_COUNT, pageIndex: TOTAL_PAGE_COUNT })
    props.onPageChange(TOTAL_PAGE_COUNT)
  }
  return <div id={tableStyles.mainContent}>
    <div id={paginationStyles.pagination}>
      <div id={paginationStyles.paginationWrapper}>
        {rangeButton('First', previousButtonDisabled, onFirstPageClicked)}
        {rangeButton('<< Previous', previousButtonDisabled, onRangeButtonClicked.bind(this, state.pageIndex - 1))}
        {navigationButton(state.pageRangeStart, 1)}
        {navigationButton(state.pageRangeStart + 1, 2)}
        {navigationButton(state.pageRangeStart + 2, 3)}
        {navigationButton(state.pageRangeStart + 3, 4)}
        {navigationButton(state.pageRangeStart + 4, 5)}
        {navigationButton(state.pageRangeStart + 5, 6)}
        {rangeButton('Next >>', nextButtonDisabled, onRangeButtonClicked.bind(this, state.pageIndex + 1))}
        {rangeButton('Last', nextButtonDisabled, onLastPageClicked)}
        <Input
          label='Go To Page'
          type="number"
          name='page'
          min="0"
          max={TOTAL_PAGE_COUNT}
          classes={goToPageClasses}
          onKeyDown={handleGoToPageEnterKey}
        />
      </div>
    </div>
    <WebsitesTable
      isMobile={props.isMobile}
      category={props.category}
      country={props.country}
      pageIndex={state.pageIndex}
      getData={props.getData}
    />
  </div>
}

