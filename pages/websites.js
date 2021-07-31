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


// TODO: Show page number above filter section
export default function Websites() {
  const [category, setCategory] = useState({})
  const [country, setCountry] = useState({})
  const [page, setPage] = useState(0)
  const onLinkedInLogoClick = () => { 
    window.open(LINKED_IN_PROFILE_URL)
  } 

  const footerClassNames = classNames({
    [utilStyles.displayFlex]: true,
    [utilStyles.footer]: true
  })

  const onCategoryChange = (category) => setCategory(category)  
  const onCountryChange = (country) => setCountry(country)
  
    return <div id="tableContainer" className={tableStyles.container}>
      <Meta title="World in 2021" />
      <ToastContainer />
      {/* Filter section */}
      <section className={utilStyles.filterSection}>
          <div style={{color: "white", paddingBottom: "1vh"}}>Filter websites on page {page}: <br/> 
              - Choose one country <br/>
              - Choose one category
          </div>
          <FilterList id="categoryFilterList" title="Categories" items={WEBSITE.CATEGORIES} onChange={onCategoryChange}/>
          <FilterList id="countryFilterList" title="Countries" items={WEBSITE.COUNTRIES} onChange={onCountryChange}/>   
      </section>
      {/* Filter section */}
                   
      {/* Table section */}
      <section>
        <Header/>
        <MainContent category={category} country={country} />
        <div/>
          <div className={footerClassNames}>
            <strong>*Disclaimer: Images on this page are copyright of their owners. I am not responsible for the content of external websites.</strong>
            <strong className={utilStyles.displayFlex}>Copyright © World in 2021 ©
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
      </section>
      {/* Table section */}

      {/* Description section */}
      <section id={utilStyles.descriptionSection}>
        <p>
        *This page is made for people of all age. To make its surfing experience as safe as possible,
             all website pages are checked by <a href="https://cloud.google.com/web-risk" target="_blank">Google Web Risk</a> for detecting adult, racy, violence, and other kind
             of inappropriate content. Every image is checked by <a href="https://cloud.google.com/vision" target="_blank">Google Cloud Vision</a> in order to prevent advertising
            nudity, violence, criminal activities and other disturbing content.
        </p>
      </section>
      {/* Description section */}

      </div>
  }