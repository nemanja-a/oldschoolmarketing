import { Header } from "./Header"
import { useState } from "react"
import RecentlyJoined from "./RecentlyJoined"
import { Chalkboard } from "./Chalkboard"
import { classNames, getRecentlyJoined } from "../../lib/util"
import { FiltersDialog } from "./FiltersDialog"
import { LINKED_IN_PROFILE_URL, WEBSITE } from "../../util/variables"
import style from "../../styles/mobile.module.css"
import utilStyles from "../../styles/utils.module.css"
import Image from "next/image"
import ActiveFilters from "./ActiveFilters"

export default function MobileView() {
    let recentlyJoined
    const defaultState = {
        category: {},
        country: {}, 
        page: 0,
        showFiltersDialog: false
      }
    const [ state, setState ] = useState(defaultState)              
    const onDataReceived = (data) => {             
      recentlyJoined = getRecentlyJoined(data)         
      // TODO
      // setState({...state, recentlyJoined})
    }        
    
    const onChange = (filters) => {      
       if (filters.category && filters.country) {         
        setState({...state, category: filters, countries: filters}) 
       } else if (filters.category) {
         setState({...state, category: filters })
       } else if (filters.country) {
        setState({...state, country: filters })
       } else {
          setState({...state, country: {}, category: {}})
       }      
    }
    const onPageChange = (page) => { setState({...state, page}) }
    const categories = JSON.parse(JSON.stringify(WEBSITE.CATEGORIES))
    const countries = JSON.parse(JSON.stringify(WEBSITE.COUNTRIES))
  
    countries.unshift({displayValue: "All"})
    categories.unshift({displayValue: "All"})

    const onLinkedInLogoClick = () => { 
      window.open(LINKED_IN_PROFILE_URL)
    } 
    
    const FIlters = () =>  { 
      return <div className={style.filters}>
        <FiltersDialog 
          showButton
          showCategories
          showCountries
          selectedCountry={state.country}
          selectedCategory={state.category}      
          onChange={onChange}      
        />
        <ActiveFilters
           selectedCategory={state.category}
           selectedCountry={state.country}  
           clearFilters={onChange}          
        />
      </div>
    }

    const footerClassNames = classNames({      
      [utilStyles.footer]: true
    })

    return (
        <div id="mobileContainer">
            <Header isMobile={true}/>
            <RecentlyJoined page={state.page} website={recentlyJoined}/>
            {/* <div className={style.title}>Internet marketing made simple</div> */}
            <div className={style.title}>Lifetime marketing on chalkboard for 2$</div>
            <FIlters />            
            <div className={style.text}>Swipe across the chalk board to see more</div>
            <Chalkboard category={state.category} country={state.country} onPageChange={onPageChange} getData={onDataReceived}/>            
            <div className={footerClassNames}>
              <strong>*Disclaimer: Images on this page are copyright of their owners. I am not responsible for the content of external websites.</strong>
              <strong className={utilStyles.copyright}>Copyright © Old School Marketing ©
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
        </div>
    )
}