import '@reach/dialog/styles.css'
import styles from "../../styles/header.module.css"
import { IntroductionDialog } from '../IntroductionDialog';

export function Header() {

  return (
    <div id="header" className={styles.container}>
      <div className={styles.textContent}>Old School marketing</div>
      <div className={styles.textContent}><IntroductionDialog showOnInit isMobile={true} /></div>
    </div>
  )
}