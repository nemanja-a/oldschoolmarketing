import '@reach/dialog/styles.css'
import styles from "../../styles/header.module.css"
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import FadeIn from 'react-fade-in';
import { AboutPage } from '../AboutPage';
import { IntroductionDialog } from '../IntroductionDialog';

export function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const onMenuClicked = (toggled) => setShowMenu(toggled)

  return (
    <div id="header" className={styles.container}>
      <div className={styles.textContent}>Old School marketing</div>
      <div className={styles.textContent}><IntroductionDialog showOnInit isMobile={true}/></div>
      {/* <Hamburger easing="ease-in" onToggle={onMenuClicked}/>
      {showMenu && <FadeIn className={styles.menu} transitionDuration={500}>
        <div><AboutPage/></div>
        <div><IntroductionDialog showOnInit={false}/></div>
      </FadeIn>} */}
    </div>
  )
}