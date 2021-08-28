import style from "../../styles/utils.module.css"
import mobileStyles from "../../styles/mobile.module.css"
import { WEBSITE } from "../../util/variables"
import Image from "next/image"
import detectDevice from "../common/DeviceDetect"
import { classNames } from "../../lib/util"

export default function ImageInfoCard({ website, classes }) {
  const isMobile = detectDevice()

  const onWebsiteClick = (event, websiteUrl) => {
    if (!isMobile) {
      window.open(websiteUrl, '_blank')
    }
  }

  const imageClasses = classNames({
    [mobileStyles.imageWrapper]: isMobile
  })

  const renderLabel = (id, type) => {
    if (type === "category") {
      const categories = WEBSITE.CATEGORIES
      const category = categories.find(item => {
        return item.value === id
      })
      return category && category.displayValue
    } else if (type === "country") {
      const countries = WEBSITE.COUNTRIES
      const country = countries.find(item => {
        return item.value === id
      })
      return country && country.displayValue
    }
  }

  return (
    <div
      id={`r${website.rowIndex}-c${website.columnIndex}`}
      className={classes}
      onClick={(event) => onWebsiteClick(event, website.url)}
    >
      <div className={style.imageInfoTop}>
        {website.countries && website.countries.length &&
          <span>
            {website.countries.map((countryId, index) => {
              return <span key={index}>#{renderLabel(countryId, "country")}</span>
            })}
          </span>}
        <span>
          {website.categories.map((categoryId, index) => {
            return <span key={index}>#{renderLabel(categoryId, "category")}</span>
          })}
        </span>
      </div>
      <Image
        priority
        src={website.thumbnail.url || WEBSITE.THUMBNAIL.TABLE_DEFAULT}
        className={imageClasses}
        layout="fill"
        alt='No image found'
      />
      <div className={style.imageInfoBottom}>
        <div className={style.imageInfoRow}>
          <span>URL</span>
          <strong>{website.url}</strong>
        </div>
        <div className={style.imageInfoRow}>
          <span>Description</span>
          <strong>{website.description}</strong>
        </div>
      </div>
    </div>
  )
}