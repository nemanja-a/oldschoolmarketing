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

export function WelcomeDialog(props) {
  const [showDialog, setShowDIalog] = useState(true)
  const close = () => { setShowDIalog(false), props.onClose() }

  const wrapperClasses = classNames({
      [dialogStyles.dialog]: true,
      [dialogStyles.startUpDialog]: true
  })

  return (
    <div className={wrapperClasses}>

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
        <p className={dialogStyles.welcomeText}>
          <span style={{textAlign: "center", marginLeft: "4vw"}}>Page that holds <span className={dialogStyles.highlightedText}>internet history of year 2021</span> at one place.</span> <br/><br/>
          Buying a place for <span className={dialogStyles.highlightedText}>2€</span> means joining the <span className={dialogStyles.highlightedText}>internet history of year 2021</span> and having an advertisement <span className={dialogStyles.highlightedText}>forever</span>. <br/><br/>
          <span className={dialogStyles.highlightedText}>Want to join?</span> Click on any place on the table with <span className={dialogStyles.highlightedText}>World in 2021 logo</span> to get started.
          Otherwise, as <span className={dialogStyles.highlightedText}>ALL</span> kinds of websites are welcome here, hopefully you will find websites with content of your interest on over <span className={dialogStyles.highlightedText}>3000</span> pages. <br/><br/>
          <span style={{textAlign: "center", marginLeft: "10vw"}}>Enjoy and don't stay too long!</span> 
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}