import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import dialogStyles from "../styles/dialog.module.css"
import utilStyles from "../styles/utils.module.css"
import FadeIn from 'react-fade-in';
import { classNames } from '../lib/util'
import { WEBSITE } from '../util/variables'
import tableStyles from "../styles/table.module.css"
import Image from 'next/image'

export function GettingStartedDialog() {
  const [showDialog, setShowDIalog] = useState(true)
  const close = () => { setShowDIalog(false) }
  const open = () => { setShowDIalog(true) }

  const wrapperClasses = classNames({
      [dialogStyles.startUpDialog]: true
  })

  return (
    <div className={wrapperClasses}>
      <a href="#" onClick={open}>About this page</a> 
      {/* Dialog */}
      <Dialog className={dialogStyles.dialog} aria-label="add-website-dialog" isOpen={showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <button className={utilStyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          <div className={dialogStyles.title}>Welcome to</div>    

        <div className={dialogStyles.websitePreview} style={{justifyContent: "center"}}>
          <div>
            <div className={dialogStyles.imagePreviewWrapper}>
            <Image
                priority
                src={WEBSITE.THUMBNAIL.DEFAULT}
                className={tableStyles.websiteImage}
                layout="fill"
                alt={WEBSITE.THUMBNAIL.NO_IMAGE_FOUND}
            />  
            </div>
          </div>
        </div>
        {/* <p className={dialogStyles.welcomeText}>
          Online libary of websites of 2021. To add a website, click on any place on the table with <span className={dialogStyles.highlightedText}>World in 2021 logo</span>,
          add the URL to your website and custom image of your choice, which describes your website the best.  
        </p> */}
        <p className={dialogStyles.welcomeText}>
          <span>Page meant to represent <span className={dialogStyles.highlightedText}>internet history of the year 2021</span> and everyone is welcome to join.</span> <br/><br/>        
          By clicking on any place available on the table marked with <span className={dialogStyles.highlightedText}>World In 2021 logo</span>, you will be able to upload image of your choice, customize its appearance, provide a URL and select category of your website.
          Once everything is done, website will stay at that very spot forever. <br/><br/>

          This is the place where you will have advertising of your website forever, but also you will give your contribution in creating internet history of 2021.
          If you are here for surfing, have fun visiting websites that will one day remind us of year 2021. 
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}