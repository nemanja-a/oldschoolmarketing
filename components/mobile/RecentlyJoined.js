import { useState } from "react"
import style from "../../styles/mobile.module.css"
import ImageInfoCard from "../web/ImageInfoCard"

export default function RecentlyJoined({page, website}) {
    const defaultState = {
        category: {},
        country: {}, 
        page: 0
      }
      const [ state, setState ] = useState(defaultState)       
    const onPageChange = (page) => { setState({...state, page}) }    
    
    return (
        <div className={style.recentlyJoinedWrapper}>            
            {website && <div className={style.imageWrapper}>
                <div>Recently joined on page {page}</div>
                <ImageInfoCard website={website}/>  
            </div>}
        </div>
    )
}