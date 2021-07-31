import loaderStyles from "../styles/loader.module.css"
export function TableLoader() {

    return <div id={loaderStyles.tableLoader}>
        <div className={loaderStyles.spinner}></div>
    </div>
}