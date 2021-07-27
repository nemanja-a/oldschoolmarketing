import loaderStyles from "../styles/loader.module.css"
export function ModalLoader(props) {

    return <div id={loaderStyles.modalLoader}>
        <div className={loaderStyles.spinner}></div>
        <div className={loaderStyles.text}>{props.text}</div>
    </div>
}