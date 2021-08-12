import '@reach/dialog/styles.css'
import styles from "../../styles/header.module.css"
import utilStyles from "../../styles/utils.module.css"
import { IntroductionDialog } from '../IntroductionDialog'
import { AboutPage } from '../AboutPage'

export function Header() {
  return (
    <div id="header" className={utilStyles.displayFlex}>
      <div id={styles.textContent}>
        <div id={styles.appName}>World in 2021</div>
        <div id={styles.appDescription}><AboutPage /></div>
        <div id={styles.gettingStartedWrapper}>
          <div style={{fontSize: "medium"}}><IntroductionDialog/></div>
        </div>
      </div>
    </div>
  )
}