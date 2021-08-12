import { Header } from "./Header"
import style from "../../styles/mobile.module.css"


export default function MobileView() {
    
    return (
        <div id="mobileContainer">
            <Header isMobile/>
        </div>
        // <div className={style.container}>
        //     <span>Coming soon!</span>
        // </div>
    )
}