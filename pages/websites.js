import tableStyles from "../styles/table.module.css"
import 'react-virtualized/styles.css'
import { Header } from "../components/Header"
import React, { useState } from "react"
import { MainContent } from "../components/MainContent"
import { ToastContainer } from "react-toastify"
import Meta from "../components/common/Meta"
import utilStyles from "../styles/utils.module.css"
import { WelcomeDialog } from "../components/WelcomeDialog"
import { useEffect } from "react"
import Image from "next/image"
import { LINKED_IN_PROFILE_URL } from "../util/variables"

export default function Websites() {
  const [state, setState] = useState({
    initialRender: true,
    showWelcomeDialog: false
  })
  useEffect(() => {
    setTimeout(() => { 
      state.initialRender && setState({showWelcomeDialog: true})
    }, 300) 
  })

  const onLinkedInLogoClick = () => { 
    window.open(LINKED_IN_PROFILE_URL)
  }

  const onWelcomeDialogClose = () => {
    setState({showWelcomeDialog: false})
  }
  
    return <div id="tableContainer" className={tableStyles.container}>
      {state.showWelcomeDialog && <WelcomeDialog onClose={onWelcomeDialogClose}></WelcomeDialog>}
      <Meta title="World in 2021" />
      <ToastContainer />
      <div style={{margin: 'auto'}}>
        <Header/>
        <MainContent />
        <div id={utilStyles.tableBottom}/>
        <div id={utilStyles.footer}>
          <strong>*Disclaimer: Images on this page are copywright of their owners. I am not responsible for the content of external sites.</strong>
          <strong className={utilStyles.displayFlex}>Copyright © World in 2021 ©
           &nbsp; <a href={LINKED_IN_PROFILE_URL} target="_blank">Nemanja Apostolovic</a> &nbsp;
              <Image
                onClick={onLinkedInLogoClick}
                priority
                src='/images/In-Blue-Logo.png.original.png'
                alt="LinkedIn Logo"
                className={utilStyles.linkedInLogo}
                width={25}
                height={25}
              />  
            </strong>
        </div>

      </div>
  </div>
  }