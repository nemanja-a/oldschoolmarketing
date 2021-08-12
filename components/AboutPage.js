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

export function AboutPage() {
  const [showDialog, setShowDIalog] = useState(false)
  const close = () => { setShowDIalog(false) }
  const open = () => { setShowDIalog(true) }

  const wrapperClasses = classNames({
      [dialogStyles.headerText]: true
  })

  return (
    <div className={wrapperClasses}>
        
      <a href="#" onClick={open}>What is this page and why?</a> 
      {/* Dialog */}
      <Dialog className={dialogStyles.dialog} aria-label="add-website-dialog" isOpen={showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <button className={utilStyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          <div className={dialogStyles.title}>About</div>    

        <div className={dialogStyles.websitePreview} style={{justifyContent: "center"}}>
          <div>
            <div className={dialogStyles.imagePreviewWrapper}>
            <Image
                priority
                src={WEBSITE.THUMBNAIL.IMAGE_PREVIEW_DEFAULT}
                className={tableStyles.websiteImage}
                layout="fill"
                alt="No image found"
            />  
            </div>
          </div>
        </div>
        <p className={dialogStyles.welcomeText}>
          <span>
          <strong>What do I do here?</strong> <br/>
          On <strong>World in 2021</strong> you can <strong>explore websites</strong> and <strong>add your website</strong>.

          </span>
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}