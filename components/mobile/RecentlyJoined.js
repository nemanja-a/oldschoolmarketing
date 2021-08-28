import style from "../../styles/mobile.module.css"
import ImageInfoCard from "../web/ImageInfoCard"

export default function RecentlyJoined({ page, website }) {

    return (
        <div className={style.recentlyJoinedWrapper}>
            {website && <div className={style.imageWrapper}>
                <div>Recently joined on page {page}</div>
                <ImageInfoCard website={website} />
            </div>}
        </div>
    )
}