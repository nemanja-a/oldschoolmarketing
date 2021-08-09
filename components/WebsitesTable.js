import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { classNames, getTableParams } from "../lib/util"
import tableStyles from "../styles/table.module.css"
import Image from "next/image"
import { Table } from "react-virtualized"
import { ROWS_PER_PAGE, WEBSITE } from "../util/variables"
import { TableLoader } from "./TableLoader"
import { AddWebsiteDialog } from "./AddWebsiteDialog"

export function WebsitesTable ({ pageIndex, category, country }) {
  let tableParams;
  const [ state, setState ] = useState({
    columnIndex: 0,
    rowIndex: 0,
    showDialog: false,
    container: null
  })

  useEffect(() => {
    const container = document.getElementById("tableContainer")
    !state.container && setState({...state, container})
  })

  const open = () => setShowDialog(true)
  const close = async(afterAddSuccess) => {
    // prevent closing on ESC press
    if (event && event.keyCode && event.keyCode === 27) return 
    localStorage.removeItem('amount')
    afterAddSuccess && mutate()
    setState({...state, showDialog: false})
  }

  const onEmptyCellClick = (event) => { 
    const columnIndex = Number(event.currentTarget.getAttribute("data-columnindex"))
    const rowIndex = Number(event.currentTarget.getAttribute("data-rowindex"))
    const website = data.websites.find(website => { 
      return website.rowIndex === rowIndex && website.columnIndex === columnIndex
    })
    setState({columnIndex, rowIndex, website, showDialog: true })  
  }

    tableParams = (state.container && !state.tableParams) && getTableParams(state.container)

    const fetcher = async(url) => fetch(url).then(res => res.json())      

    const getWebsitesURL = 'api/websites'
      let getWebsitesQueryParams
      const shouldFetchWebsites = tableParams
      if (country.value !== undefined && category.value !== undefined) {
        getWebsitesQueryParams = `${getWebsitesURL}?page=${Number(pageIndex)}&category=${category.value}&country=${country.value}`
      } else if (country.value !== undefined) {
        getWebsitesQueryParams = `${getWebsitesURL}?page=${Number(pageIndex)}&country=${country.value}`
      } else if (category.value !== undefined) {
        getWebsitesQueryParams = `${getWebsitesURL}?page=${Number(pageIndex)}&category=${category.value}`
      } else {
        getWebsitesQueryParams = `${getWebsitesURL}?page=${Number(pageIndex)}`
      }  
    const { data, error, mutate } = useSWR(shouldFetchWebsites ? getWebsitesQueryParams : null, fetcher)  

    if (error) return <div className={tableStyles.noData}>An error has occured</div>
    if (!data) return <TableLoader/> 
    const filterActive = country.value !== undefined || category.value !== undefined
    if (data) {
      const hasData = data.websites.find(website => { 
        if (!website.isEmpty) return true
      })
      if (!hasData && filterActive) {
        return <div className={tableStyles.noData}>No data found</div>
      }
    }
    const emptyCellClasses = classNames ({
      [tableStyles.emptyCell]: true,
      [tableStyles.cellDisabled]: filterActive
    })
    
    const rowGetter = ({index}) => { 
      if(!data) return {}
      
      const rowData = data.websites.filter(website => {
        return website.rowIndex === index
      })
      if (index >= ROWS_PER_PAGE - 5) {
        rowData.map(website => { 
          website.bottomRow = true
          return website
        })
      }
      return rowData
    }

    const onWebsiteClick = (websiteUrl) => {
      window.open(websiteUrl, '_blank')
    }

    const renderLabel = (id, type) => { 
      if (type === "category") {
        const categories = WEBSITE.CATEGORIES
        console.log(id)
        const category = categories.find(item => { 
          return item.value === id
        })
        return category && category.displayValue
      } else if (type === "country") {
        const countries = WEBSITE.COUNTRIES
        const country = countries.find(item => { 
          return item.value === id
        })
        return country && country.displayValue
      }
    }
    const rowRenderer = (props) => {
      if (!Object.keys(props.rowData).length) return false
      return <div key={props.index} className={tableStyles.row}>
        
        {props.rowData.map((cell, index) => {
          let cellClasses = classNames({
            [tableStyles.cell]: true,
            [tableStyles.transformOriginCenter]: cell.bottomRow
          })                            
      
          cell.page = pageIndex

          return cell.isEmpty ? <a 
            onClick={onEmptyCellClick}
            style={{'width': tableParams.cellWidth, 'height': tableParams.rowHeight }}
            key={`r${cell.rowIndex}-c${cell.columnIndex}`}
            className={emptyCellClasses}
            data-columnindex={cell.columnIndex}
            data-rowindex={cell.rowIndex}
            id={`r${cell.rowIndex}-c${cell.columnIndex}`}
          > 
          <Image
            priority  
            src={WEBSITE.THUMBNAIL.TABLE_DEFAULT}
            className={tableStyles.websiteImage}
            layout="fill"
            alt="No image found"
          />
        </a>
          : 
          <div
           key={`r${cell.rowIndex}-c${cell.columnIndex}`}
           id={`r${cell.rowIndex}-c${cell.columnIndex}`} 
           className={cellClasses}
           onClick={() => onWebsiteClick(cell.url)}
           >
            <div className={tableStyles.imageInfoTop}>            
                 <span>
                   {cell.categories.map((categoryId, index) => { 
                     return <span key={index}>#{renderLabel(categoryId, "category")}</span>
                   })}
                </span>
              {cell.countries && cell.countries.length && 
                 <span>
                   {cell.countries.map((countryId, index) => { 
                     return <span key={index}>#{renderLabel(countryId, "country")}</span>
                   })}
                </span>}
            </div>                 
            <Image
              priority
              src={cell.thumbnail.url || WEBSITE.THUMBNAIL.DEFAULT}
              className={tableStyles.websiteImage}
              layout="fill"
              alt='No image found'
            />
            <div className={tableStyles.imageInfoBottom}>
              <div className={tableStyles.imageInfoRow}>
                <span>URL</span>
                <strong>{cell.url}</strong>
              </div>
              <div className={tableStyles.imageInfoRow}>
                <span>Description</span>
                <strong>{cell.description}</strong>
              </div> 
            </div>

          </div>          
        })}
       </div>
    }
  
    return  <div>
        {tableParams && <Table
            width={tableParams.tableWidth}
            height={tableParams.tableHeight}
            headerHeight={0}            
            rowHeight={tableParams.rowHeight}
            rowGetter={rowGetter}
            rowRenderer={rowRenderer}
            rowCount={ROWS_PER_PAGE}
            className={tableStyles.table}
            disableHeader={true}
          >
          </Table>}
          {state.showDialog && 
            <AddWebsiteDialog columnIndex={state.columnIndex} rowIndex={state.rowIndex} 
            website={state.website} close={close}/>}
      </div>
}