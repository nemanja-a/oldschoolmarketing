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
import { Button } from "../components/common/Button"

export default function Websites() {
  const [applyFilters, setApplyFilters] = useState(false)
  let [selectedCategories, setSelectedCategories] = useState([])

  const onLinkedInLogoClick = () => { 
    window.open(LINKED_IN_PROFILE_URL)
  }

  const footerClassNames = classNames({
    [utilStyles.displayFlex]: true,
    [utilStyles.footer]: true
  })

  const onApplyFiltersClick = () => { 
    setApplyFilters(true)
  }

  const onCategoryClicked = (category) => { 
    if (selectedCategories.includes(category.value)) {
      selectedCategories = selectedCategories.filter(selectedCategory => {
        return selectedCategory !== category.value
      })
    } else { 
      selectedCategories.push(category.value)
    }
  }
  
    return <div id="tableContainer" className={tableStyles.container}>
      <Meta title="World in 2021" />
      <ToastContainer />
      <section className={utilStyles.categoriesSection}>
        <div style={{color: "white", paddingBottom: "1vh"}}>FIlter by categories:</div>
        <div className={utilStyles.categoriesListWrapper}>
          {WEBSITE.CATEGORIES.map((category, index) => { 
            return <div key={index}>
              <label htmlFor={category.displayValue}>{category.displayValue}</label>
              <input type="checkbox" onChange={() => onCategoryClicked(category)} id={category.displayValue} key={index} value={category.value} />
            </div>
          })}
        </div>
         <Button primary onClick={onApplyFiltersClick} className={utilStyles.applyFiltersButton} >Apply Filters</Button>
      </section>
      <div>
        <Header/>
        <MainContent applyFilters={applyFilters} categories={selectedCategories} />
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
      </div>
      </div>
  }