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
        <p className={dialogStyles.welcomeText}>A lot of interesting things made year 2021 to be remembered by. Music, movies, TV shows, books, education and self-care systems,
           phones, cars, buildings, online stores and whole lot of other things were made differently to make our daily lives much more fun and enjoyable. <br/> 
           This page is made to keep a memory of what we created and how we spent time in year 2021 - a little bit of everything at one place. <br/><br/>
           Posting a website here is a one-time deal, which means, unless the website does not have any innapropriate or disturbing content,
           it will be here forever. <br/><br/><br/>
           Enjoy!
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}