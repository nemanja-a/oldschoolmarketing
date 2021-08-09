import '@reach/dialog/styles.css'
import styles from "../styles/header.module.css"
import utilStyles from "../styles/utils.module.css"
import { GettingStartedDialog } from './GettingStartedDialog'

export function Header() {
  return (
    <div id="header" className={utilStyles.displayFlex}>
      <div id={styles.textContent}>
        <div id={styles.appName}>Two million dollars homepage</div>
        <div id={styles.appDescription}>Raising funds for electromagnetism research</div>
        <div id={styles.gettingStartedWrapper}>
          <div style={{fontSize: "medium"}}><GettingStartedDialog/></div>
        </div>
      </div>
    </div>
  )
}