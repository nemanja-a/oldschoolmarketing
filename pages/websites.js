import tableStyles from "../styles/table.module.css"
import 'react-virtualized/styles.css'
import { Header } from "../components/Header"
import React from "react"
import { MainContent } from "../components/MainContent"
import { ToastContainer } from "react-toastify"
import Meta from "../components/common/Meta"
import utilStyles from "../styles/utils.module.css"
import Image from "next/image"
import { LINKED_IN_PROFILE_URL } from "../util/variables"
import { classNames } from "../lib/util"

export default function Websites() {

  const onLinkedInLogoClick = () => { 
    window.open(LINKED_IN_PROFILE_URL)
  }

  const footerClassNames = classNames({
    [utilStyles.displayFlex]: true,
    [utilStyles.footer]: true
  })
  
    return <div id="tableContainer" className={tableStyles.container}>
      <Meta title="World in 2021" />
      <ToastContainer />
      <div style={{marginLeft: '9%'}}>
        <Header/>
        <MainContent />
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