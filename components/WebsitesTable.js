import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { classNames, getTableParams, handleGetWebsiteRequestParams, handleMobileGetWebsiteRequestParams, setCornerCellsStyles, setWebsiteTransformOrigin } from "../lib/util"
import tableStyles from "../styles/table.module.css"
import Image from "next/image"
import { Table } from "react-virtualized"
import { ROWS_PER_PAGE, WEBSITE } from "../util/variables"
import { TableLoader } from "./TableLoader"
import { AddWebsiteDialog } from "./AddWebsiteDialog"
import detectDevice from "./common/DeviceDetect"
import ImageInfoCard from "./web/ImageInfoCard"
import ImagePreviewDialog from "./mobile/ImagePreviewDialog"

export function WebsitesTable({ pageIndex, category, country, getData }) {
  let tableParams;
  const websiteTableRef = React.createRef()
  const [state, setState] = useState({
    columnIndex: 0,
    rowIndex: 0,
    showDialog: false,
    container: null
  })

  useEffect(() => {
    const container = isMobile ? document.getElementById("mobileContainer") : document.getElementById("tableContainer")
    !state.container && setState({ ...state, container })
  })

  const isMobile = detectDevice()
  const close = async (afterAddSuccess) => {
    // prevent closing on ESC press
    if (event && event.keyCode && event.keyCode === 27) return
    localStorage.removeItem('amount')
    afterAddSuccess && mutate()
    setState({ ...state, showDialog: false })
  }

  const onEmptyCellClick = (event) => {
    if (state.showDialog) {
      setState({ showDialog: false })
      return
    }
    const columnIndex = Number(event.currentTarget.getAttribute("data-columnindex"))
    const rowIndex = Number(event.currentTarget.getAttribute("data-rowindex"))
    const website = data.websites.find(website => {
      return website.rowIndex === rowIndex && website.columnIndex === columnIndex
    })
    setState({ columnIndex, rowIndex, website, showDialog: true })
  }

  tableParams = (state.container && !state.tableParams) && getTableParams(state.container)

  const fetcher = async (url) => fetch(url).then(res => res.json())

  const shouldFetchWebsites = tableParams
  const getWebsitesQueryParams = isMobile ?
    handleMobileGetWebsiteRequestParams(Number(pageIndex), category, country)
    :
    handleGetWebsiteRequestParams(Number(pageIndex), category, country)
  const { data, error, mutate } = useSWR(shouldFetchWebsites ? getWebsitesQueryParams : null, fetcher)

  if (error) return <div className={tableStyles.noData}>An error has occured</div>
  if (!data) return <TableLoader />
  const filterActive = (country.value !== undefined || country.length) ||
    (category.value !== undefined || category.length)
  if (data) {
    const hasData = data.websites.find(website => {
      if (!website.isEmpty) return true
    })
    if (!hasData && filterActive) {
      return <div className={tableStyles.noData}>No data found</div>
    } else {
      getData(data)
    }
  }

  const rowGetter = ({ index }) => {
    if (!data) return {}

    const rowData = data.websites.filter(website => {
      return website.rowIndex === index
    })

    rowData.map(website => {
      website = setWebsiteTransformOrigin(website, index)
      website = setCornerCellsStyles(website, index)
      return website
    })

    return rowData
  }

  const WebsiteImage = ({ cell, cellClasses }) => {
    return !isMobile ?
      <div>
        <ImageInfoCard
          website={cell}
          classes={cellClasses}
        />
      </div>
      :
      <ImagePreviewDialog website={cell} classes={cellClasses} />
  }

  const WebsiteTable = React.forwardRef((props, ref) => {
    return <Table
      width={props.tableParams.tableWidth}
      height={props.tableParams.tableHeight}
      headerHeight={0}
      rowHeight={props.tableParams.rowHeight}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
      rowCount={ROWS_PER_PAGE}
      className={tableStyles.table}
      disableHeader={true}
      ref={ref}
    />
  })

  const rowRenderer = (props) => {
    if (!Object.keys(props.rowData).length) return false
    return <div key={props.index} className={tableStyles.row}>

      {props.rowData.map((cell) => {
        const cellClasses = classNames({
          [tableStyles.cell]: true,
          [tableStyles.transformOriginBottom]: cell.bottomRow,
          [tableStyles.transformOriginTop]: cell.topRow,
          [tableStyles.topLeftBorder]: cell.topLeftBorderCell,
          [tableStyles.bottomLeftBorder]: cell.bottomLeftBorderCell,
          [tableStyles.topRightBorder]: cell.topRightBorderCell,
          [tableStyles.bottomRightBorder]: cell.bottomRightBorderCell,
        })
        const emptyCellClasses = classNames({
          [tableStyles.emptyCell]: true,
          [tableStyles.cellDisabled]: filterActive,
          [tableStyles.topLeftBorder]: cell.topLeftBorderCell,
          [tableStyles.bottomLeftBorder]: cell.bottomLeftBorderCell,
          [tableStyles.topRightBorder]: cell.topRightBorderCell,
          [tableStyles.bottomRightBorder]: cell.bottomRightBorderCell,
        })
        const tableImageClasses = classNames({
          [tableStyles.websiteImage]: true,
          [tableStyles.imageBordered]: filterActive && !isMobile
        })

        cell.page = pageIndex

        return cell.isEmpty ? <a
          onClick={onEmptyCellClick}
          style={{ 'width': tableParams.cellWidth, 'height': tableParams.rowHeight }}
          key={`r${cell.rowIndex}-c${cell.columnIndex}`}
          className={emptyCellClasses}
          data-columnindex={cell.columnIndex}
          data-rowindex={cell.rowIndex}
          id={`r${cell.rowIndex}-c${cell.columnIndex}`}
        >
          <Image
            priority
            src={!filterActive ? WEBSITE.THUMBNAIL.TABLE_DEFAULT : WEBSITE.THUMBNAIL.CELL_DISABLED_BACKGROUND}
            // className={tableStyles.websiteImage}
            className={tableImageClasses}
            layout="fill"
            alt="No image found"
          />
        </a>
          :
          <WebsiteImage key={`r${cell.rowIndex}-c${cell.columnIndex}`} cell={cell} cellClasses={cellClasses} />
      })}
    </div>
  }

  return <div style={{ display: "flex" }}>
    {tableParams && <WebsiteTable tableParams={tableParams} ref={websiteTableRef} />}
    {state.showDialog &&
      <AddWebsiteDialog columnIndex={state.columnIndex} rowIndex={state.rowIndex}
        website={state.website} close={close} />}
  </div>
}