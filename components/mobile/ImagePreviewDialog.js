import Dialog from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"
import { useState } from "react"
import FadeIn from "react-fade-in"
import { WEBSITE } from "../../util/variables"
import Image from "next/image"
import dialogStyles from "../../styles/dialog.module.css"
import { classNames } from "../../lib/util"
import utilStyles from "../../styles/utils.module.css"

export default function ImagePreviewDialog({ website, classes }) {

  const [showDialog, setShowDialog] = useState(false)
  const close = () => { setShowDialog(false) }
  const open = () => { setShowDialog(true) }

  const imageClasses = classNames({
    [dialogStyles.imagePreviewMobile]: true
  })
  const imageInfoCloseButtonClasses = classNames({
    [utilStyles.closeButton]: true,
    [utilStyles.mobileImageInfoCloseButton]: true
  })

  return (
    <div className={classes}>
      <div key={`r${website.rowIndex}-c${website.columnIndex}`} onClick={open}>
        <Image
          priority
          src={website.thumbnail.url || WEBSITE.THUMBNAIL.TABLE_DEFAULT}
          className={imageClasses}
          layout="fill"
          alt='No image found'
        />
      </div>
      <Dialog className={dialogStyles.containerMediumLarge} aria-label="add-website-dialog" isOpen={showDialog} onDismiss={close}>
        <FadeIn transitionDuration={500}>
          <div className={utilStyles.mobileImageInfoTop}>
            <button className={imageInfoCloseButtonClasses} onClick={close}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </button>
            <span>URL</span>
            <a href={website.url} target="_blank">{website.url}</a>
            <span style={{ fontSize: "smaller" }}>(Click on a link or image to open in new tab)</span>
          </div>
          <div className={dialogStyles.mobileImagePreviewWrapper} onClick={() => window.open(website.url, '_blank')}>
            <Image
              src={website.thumbnail.url || WEBSITE.THUMBNAIL.TABLE_DEFAULT}
              className={dialogStyles.mobileImagePreview}
              layout="fill"
              alt='No image found'
            />
          </div>
          <div className={utilStyles.mobileImageInfoBottom}>
            <span>Description</span>
            <span>{website.description}</span>
          </div>
        </FadeIn>
      </Dialog>
    </div>
  )
}