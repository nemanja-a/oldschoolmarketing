import '@reach/dialog/styles.css'
import styles from "../styles/header.module.css"
import utilStyles from "../styles/utils.module.css"

export function Header() {
  return (
    <div id="header" className={utilStyles.displayFlex}>
      <div id={styles.textContent}>
        <div id={styles.appName}>World in <span>2021</span></div>
        <div id={styles.appDescription}>Websites of 2021</div>
        <div>2€ per spot</div>
      </div>
    </div>
  )
}