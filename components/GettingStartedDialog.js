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
      [dialogStyles.headerText]: true
  })

  return (
    <div className={wrapperClasses}>
      <div>2$ per spot | &nbsp; </div>
      <a href="#" onClick={open}>Introduction</a> 
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
          - <strong>Browse websites </strong> - Hover over any <strong>image</strong> other than <strong>World in 2021 logo</strong> to see larger <strong>image</strong>, <strong>URL</strong> and <strong>description</strong> of a website.
           Click on image will open the link in new tab. <br/> <br/>
           Choose <strong>page</strong> by clicking on any <strong>pagination</strong> button above the table. <br/>
           Selecting <strong>country</strong> or <strong>category</strong> from <strong>filter section</strong> on the left allows
           viewing only websites related to chosen filter. Filters are applied only for <strong>active page</strong>. <br/> <br/>

          - <strong>Add website</strong> - when there is no <strong>active filter</strong>, click on any available spot with <strong>World in 2021 logo </strong> 
          and complete the steps to add your website.
          </span>
        </p>
      </FadeIn>
      </Dialog>
    </div>
  )
}