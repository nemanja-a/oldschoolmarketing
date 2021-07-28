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
          <span style={{textAlign: "center", marginLeft: "4vw"}}>Page that holds internet history of year 2021 at one place.</span> <br/><br/>
          Buying a place for 2€ here means joining the internet history of year 2021 and having an advertisement forever. <br/><br/>
          Want to join? Click on any place on the grid with World in 2021 logo to get started.
          Otherwise, as all sort of websites are welcome here, hopefully you will find content of your interest on over 3000 pages. <br/><br/>
          <span style={{textAlign: "center", marginLeft: "10vw"}}>Enjoy and don't stay too long!</span> 
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}