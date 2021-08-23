import { Header } from "./Header"
import { useState } from "react"
import RecentlyJoined from "./RecentlyJoined"
import { Whiteboard } from "./Whiteboard"
import { classNames, getRecentlyJoined } from "../../lib/util"
import { FiltersDialog } from "./FiltersDialog"
import { LINKED_IN_PROFILE_URL, WEBSITE } from "../../util/variables"
import style from "../../styles/mobile.module.css"
import utilStyles from "../../styles/utils.module.css"
import Image from "next/image"

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
        setState({...state, category: filters.category, countries: filters.country}) 
       } else if (filters.category) {
         setState({...state, category: filters.category })
       } else if (filters.country) {
        setState({...state, country: filters.country })
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
      return <FiltersDialog 
      selectedCountry={state.country}
      selectedCategory={state.category}      
      onChange={onChange}      
    />
    }

    const footerClassNames = classNames({      
      [utilStyles.footer]: true
    })

    return (
        <div id="mobileContainer">
            <Header isMobile={true}/>
            <RecentlyJoined page={state.page} website={recentlyJoined}/>
            <div className={style.title}>Choose a spot and get a lifetime marketing for your website</div>
            <FIlters />            
            <div className={style.text}>Swipe across the whiteboard to see more</div>
            <Whiteboard category={state.category} country={state.country} onPageChange={onPageChange} getData={onDataReceived}/>            
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