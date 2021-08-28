import { useState } from "react"
import { classNames, getFilters, getRecentlyJoined } from "../../lib/util"
import { LINKED_IN_PROFILE_URL, WEBSITE } from "../../util/variables"
import tableStyles from "../../styles/table.module.css"
import utilStyles from "../../styles/utils.module.css"
import filterStyles from "../../styles/filters.module.css"
import filterPanelStyles from "../../styles/filterpanel.module.css"
import Meta from "../common/Meta"
import { ToastContainer } from "react-toastify"
import { Header } from "../web/Header"
import Image from "next/image"
import { Chalkboard } from "./Chalkboard"
import { FilterPanel } from "./FilterPanel"
import VisuallyHidden from "@reach/visually-hidden"
import detectDevice from "../common/DeviceDetect"

export function WebView() {
  let recentlyJoined
  const defaultState = {
    category: {},
    country: {},
    page: 0
  }
  const [state, setState] = useState(defaultState)
  const onLinkedInLogoClick = () => {
    window.open(LINKED_IN_PROFILE_URL)
  }

  const isMobile = detectDevice()
  const onDataReceived = (data) => {
    recentlyJoined = getRecentlyJoined(data)
  }

  const footerClassNames = classNames({
    [utilStyles.displayFlex]: true,
    [utilStyles.footer]: true
  })

  const onCategoryChange = (category) => { setState({ ...state, category }) }
  const onCountryChange = (country) => { setState({ ...state, country }) }
  const onPageChange = (page) => { setState({ ...state, page }) }

  const clearFilter = (type) => { setState({ ...state, [type]: '' }) }

  const categories = getFilters(WEBSITE.CATEGORIES)
  const countries = JSON.parse(JSON.stringify(WEBSITE.COUNTRIES))

  countries.unshift({ displayValue: "All" })
  categories.unshift({ displayValue: "All" })

  const Filters = () => {
    return <section className={filterPanelStyles.container} style={{ marginTop: "43px" }}>
      <div className={filterStyles.row}>
        <div className={filterStyles.subtitle}>Categories</div>
        {!isMobile && state.category.displayValue && state.category.displayValue !== 'All' && <div className={filterStyles.selectedFilter}>
          <div className={filterStyles.filterLabel}>{state.category.displayValue}</div>
          <button className={utilStyles.closeButton} onClick={() => clearFilter('category')}>
            <VisuallyHidden>Clear</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
        </div>}
        <FilterPanel
          selected={state.category}
          id="categoryFilter"
          items={categories}
          grouped
          type="category"
          onChange={onCategoryChange}
        />
      </div>
      <div className={filterStyles.row}>
        <div className={filterStyles.subtitle}>Countries</div>
        {!isMobile && state.country.displayValue && state.country.displayValue !== 'All' && <div className={filterStyles.selectedFilter}>
          <div className={filterStyles.filterLabel}>{state.country.displayValue}</div>
          <button className={utilStyles.closeButton} onClick={() => clearFilter('country')}>
            <VisuallyHidden>Clear</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
        </div>}
        <FilterPanel
          selected={state.country}
          id="countryFilter"
          items={countries}
          type="country"
          onChange={onCountryChange}
        />
      </div>
    </section>
  }

  return <div id="tableContainer" className={tableStyles.container}>
    <Meta title="Old School Marketing" />
    <ToastContainer />
    <Filters />
    {/* Table section */}
    <section>
      <Header isMobile={false} />
      <Chalkboard category={state.category} country={state.country} onPageChange={onPageChange} getData={onDataReceived} />
      <div />
      <div className={footerClassNames}>
        <strong>*Disclaimer: Images on this page are copyright of their owners. I am not responsible for the content of external websites.</strong>
        <strong className={utilStyles.displayFlex}>Copyright © Old School marketing ©
          <div id={utilStyles.linkedInWrapper}>
            &nbsp; <a href={LINKED_IN_PROFILE_URL} target="_blank">Nemanja Apostolovic</a> &nbsp;
            <Image
              onClick={onLinkedInLogoClick}
              priority
              src='/images/In-Blue-Logo.png.original.png'
              alt="LinkedIn Logo"
              className={utilStyles.linkedInLogo}
              layout="fixed"
              width={20}
              height={20}
            />
          </div>
        </strong>
      </div>
    </section>
    {/* Table section */}

    {/* Description section */}
    <section id={utilStyles.descriptionSection}>
      <p>
        *This page is made for people of all age. To make its surfing experience as safe as possible,
        all website pages are checked by <a href="https://cloud.google.com/web-risk" target="_blank"><strong>Google Web Risk</strong></a> for detecting adult, racy, violence, and other kind
        of inappropriate content. Every image is checked by <a href="https://cloud.google.com/vision" target="_blank"><strong>Google Cloud Vision</strong></a> in order to prevent advertising
        nudity, violence, criminal activities and other disturbing content.
      </p>
    </section>
    {/* Description section */}

  </div>
}