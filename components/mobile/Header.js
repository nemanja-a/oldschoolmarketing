import '@reach/dialog/styles.css'
import styles from "../../styles/header.module.css"
import { IntroductionDialog } from '../IntroductionDialog'
import { AboutPage } from '../AboutPage'

export function Header() {
  return (
    <div id="header" className={styles.container}>
      <div className={styles.textContent}>World in 2021</div>
      <div className={styles.hamburger}><span></span></div>
    </div>
  )
}