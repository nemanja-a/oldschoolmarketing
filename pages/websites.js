import tableStyles from "../styles/table.module.css"
import 'react-virtualized/styles.css'
import { Header } from "../components/Header"
import React, { useState } from "react"
import { MainContent } from "../components/MainContent"
import { ToastContainer } from "react-toastify"
import Meta from "../components/common/Meta"
import utilStyles from "../styles/utils.module.css"
import Image from "next/image"
import { LINKED_IN_PROFILE_URL, WEBSITE } from "../util/variables"
import { classNames } from "../lib/util"
import { FilterList } from "../components/FilterList"

export default function Websites() {
  const defaultState = {
    category: {},
    country: {}, 
    page: 0
  }
  const [ state, setState ] = useState(defaultState)
  const onLinkedInLogoClick = () => { 
    window.open(LINKED_IN_PROFILE_URL)
  } 

  const footerClassNames = classNames({
    [utilStyles.displayFlex]: true,
    [utilStyles.footer]: true
  })

  const onCategoryChange = (category) => { setState({...state, category}) } 
  const onCountryChange = (country) => { setState({...state, country}) }
  const onPageChange = (page) => { setState({...state, page}) }
  const categories = JSON.parse(JSON.stringify(WEBSITE.CATEGORIES))
  const countries = JSON.parse(JSON.stringify(WEBSITE.COUNTRIES))

  countries.unshift({displayValue: "All"})
  categories.unshift({displayValue: "All"})
    
    return <div id="tableContainer" className={tableStyles.container}>
      <Meta title="World in 2021" />
      <ToastContainer />
      {/* Filter section */}
      <section className={utilStyles.filterSection}>
          <div style={{paddingBottom: "3vh", fontStyle: "italic"}}>
            <div style={{display: "block", background: "#cda500", color: "white", borderRadius: "5px 5px 0 0"}} > 
             Filters are applied for <strong>current</strong> page only
            </div>
            <div style={{color: "white", background: "#b08f07", borderRadius: "0 0 5px 5px"}}>Current page: {state.page}</div>
            <br/>

          </div>          
          <FilterList
             id="categoryFilterList"
             title="Category"
             searchPlaceholder="Search categories..." 
             items={categories}
             onChange={onCategoryChange}
          />
          <FilterList
             id="countryFilterList"
             title="Country"
             searchPlaceholder="Search countries..."
             items={countries}
             onChange={onCountryChange}
          />   
      </section>
      {/* Filter section */}
                   
      {/* Table section */}
      <section>
        <Header/>
        <MainContent category={state.category} country={state.country} onPageChange={onPageChange}/>
        <div/>
          <div className={footerClassNames}>
            <strong>*Disclaimer: Images on this page are copyright of their owners. I am not responsible for the content of external websites.</strong>
            <strong className={utilStyles.displayFlex}>Copyright © Two million dollars homepage ©
             <div id={utilStyles.linkedInWrapper}>
              &nbsp; <a href={LINKED_IN_PROFILE_URL} target="_blank">Nemanja Apostolovic</a> &nbsp;         
              <Image
                onClick={onLinkedInLogoClick}
                priority
                src='/images/In-Blue-Logo.png.original.png'
                alt="LinkedIn Logo"
                className={utilStyles.linkedInLogo}
                layout="fixed"
                width={25}
                height={25}
              />    
            </div> 
          </strong>           
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "baseline"}} className={utilStyles.footer}>
            Inspired by &nbsp;
            <a style={{fontSize: "2.5vh"}} href="http://www.milliondollarhomepage.com/" target="_blank"> million dollar homepage</a>
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