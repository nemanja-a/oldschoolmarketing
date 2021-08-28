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
import { Button } from './common/Button'

export function IntroductionDialog({ isMobile, showOnInit }) {
  const [showDialog, setShowDIalog] = useState(showOnInit)
  const close = () => { setShowDIalog(false) }
  const open = () => { setShowDIalog(true) }

  const wrapperClasses = classNames({
    [dialogStyles.headerText]: true
  })

  return (
    <div className={wrapperClasses}>
      <a href="#" onClick={open}>Quick start</a>
      {/* Dialog */}
      <Dialog className={dialogStyles.containerLarge} aria-label="add-website-dialog" isOpen={showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          {!isMobile && <button className={utilStyles.closeButton} onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>}
          {isMobile ? <div className={dialogStyles.title}>Welcome to <strong style={{ display: "block" }}>Old School Marketing</strong></div>
            :
            <div className={dialogStyles.title}>Welcome to</div>
          }

          {!isMobile && <div className={dialogStyles.websitePreview} style={{ justifyContent: "center" }}>
            <div className={dialogStyles.imagePreviewWrapper}>
              <Image
                priority
                src={WEBSITE.THUMBNAIL.IMAGE_PREVIEW_DEFAULT}
                className={tableStyles.websiteImage}
                layout="fill"
                alt="No image found"
              />
            </div>
          </div>}
          <p className={dialogStyles.welcomeText}>
            {!isMobile && <span>
              - <strong>Browse websites </strong> - Hover over any <strong>image</strong> other than <strong>Add</strong> to see larger <strong>image</strong>, <strong>URL</strong> and <strong>description</strong> of a website.
              Click on image will open the link in new tab. <br /> <br />
              Choose <strong>page</strong> by clicking on any <strong>button</strong>  above the chalkboard. <br />
              Selecting <strong>country</strong> or <strong>category</strong> from <strong>filter section</strong> on the left
              will filter websites on <strong>current page</strong>. <br /> <br />

              - <strong>Add website</strong> - when there is no <strong>active filter</strong>, click on any available spot with <strong>Add </strong>
              and complete the steps to add your website.

            </span>}

            {isMobile && <span>
              - <strong>Browse websites </strong> - Click on any <strong>image</strong> other than <strong>Add</strong> will zoom in the <strong>image</strong> and show website's <strong>URL</strong> and <strong>description</strong>.
              Click on <strong>URL</strong> or <strong>image</strong> itself will open the link in new tab. <br /> <br />
              Choose <strong>page</strong> by clicking on any <strong>button</strong> above the chalkboard. <br />
              Show websites for specific <strong>category</strong> or <strong>country</strong> from <strong>filters menu</strong> by
              clicking on <strong>filters</strong> button. <br /><br />

              - <strong>Add website</strong> - when there is no <strong>active filter</strong>, click on any available spot with <strong>Add </strong>
              and complete the steps to add your website.

            </span>}
          </p>
          <Button
            primary
            onClick={close}
            wrapperClasses={dialogStyles.introductionDialogButtonWrapper}
            className={dialogStyles.introductionDialogButton}>OK
          </Button>
        </FadeIn>
      </Dialog>
    </div>
  )
}