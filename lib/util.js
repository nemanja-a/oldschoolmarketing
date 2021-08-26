import { ROWS_PER_PAGE,
         COLUMNS_PER_ROW,
         CONTAINER_PADDING, 
         CUSTOM_TRANSFORM_ORIGIN_COUNT,
         TABLE_BORDER_WIDTH
        } from "../util/variables"
import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export function getTableParams (container) {
     return {
        tableHeight: container.offsetHeight,
        tableWidth: container.offsetWidth - TABLE_BORDER_WIDTH,
        rowHeight: Math.round(container.offsetHeight / ROWS_PER_PAGE - CONTAINER_PADDING),
        cellWidth: Math.round(container.offsetWidth / COLUMNS_PER_ROW)
     }
}

export function classNames(namesObject) {
    let classes = []
  
    for (let key in namesObject) {
      if (namesObject[key]) {
        classes.push(key)
      }
    }
  
    return classes.join(" ")
  }

  export function getIncrementerValue(value, wrapperHeight, direction) {
    const minLimit = 0
    const maxLimit = wrapperHeight > 19 ? 78 : 89
    if (direction === 'down' && value < maxLimit) {
      value += 1
  } else if (direction === 'up' && value > minLimit) {
      value -= 1 
  }
     return value
  }

  export const hasUnsafeContent = (detections) => { 
    let hasUnsafeContent = false
    Object.entries(detections).find(pair => { 
      if (pair[1] === 'VERY_LIKELY' && pair[0] !== 'spoof')
        hasUnsafeContent = true
    })
    return hasUnsafeContent
  }

  export const websiteExistInNearbyPages = (websiteInDatabase, page) => {
      let matchFound = false
      for (var i = 0; i < websiteInDatabase.length; i++) {
        if (page === websiteInDatabase[i].page) {
          matchFound = true
          break
        }
        if (page > websiteInDatabase[i].page) {
          if (page < websiteInDatabase[i].page + 10) {
            matchFound = true
            break
          }
        }
        if (page < websiteInDatabase[i].page) {
          if (page > websiteInDatabase[i].page - 10) {
            matchFound = true
            break
          }
        }
      }
      return matchFound
  }

  export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  export const getGSACredentials = () => { 
    return {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
  }

  export const decrypt = (hash) => {
      const algorithm = 'aes-256-ctr';
      const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
      const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
      const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
      return decrpyted.toString();
  };

  export const encrypt = (text) => {
      const algorithm = 'aes-256-ctr';
      const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
      const iv = randomBytes(16);
      const cipher = createCipheriv(algorithm, secretKey, iv);
      const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
      return {
          iv: iv.toString('hex'),
          content: encrypted.toString('hex')
      }
  }

  export const getSelectOptions = (optionsArray) => {
    const options = []
    optionsArray.forEach(option => { 
      if (option.subcategories) {
        option.subcategories.forEach(subcategory => { 
          options.push(subcategory)
        })
      }
      options.push(option)
    })
    return options
  }

  export const getFilters = (items) => { 
      let groupItems = []    

      items.forEach(item => {
          if (!groupItems.length && item.categoryIndex) {
            item.subcategories = []
            groupItems.push(item)
          } 

          if (!groupItems.includes(item) && item.categoryIndex) {
            item.subcategories = []
            item.categoryIndex && groupItems.push(item)
          } 

          if (item.subcategory) {
            groupItems.length && groupItems.forEach(groupItem => {                 
                if (groupItem.subcategories &&                  
                    groupItem.categoryIndex === item.categoryId &&
                   !groupItem.subcategories.includes(item) 
                  ) {
                    groupItem.subcategories.push(item)
                }
            })            
          }

          if (!item.subcategory && !item.categoryIndex) {
            groupItems.push(item)
          }
      })         
      return groupItems
  }

  export const getRecentlyJoined = (data) => { 
    let recentlyJoined
     for (var i = 0; i < data.websites.length; i++) {
      if (data.websites[i].createdAt) {
        if (!recentlyJoined) {
          recentlyJoined = data.websites[i]
        } else {
          if (recentlyJoined.createdAt < data.websites[i].createdAt) {
            recentlyJoined = data.websites[i]  
          }
        }                              
      }
    }
    return recentlyJoined   
  }

  export const getSelectStyles = () => { 
    return {
      chips: {
        background: "#346b31",
        color: "white"        
      },
      optionContainer: {
        height: "25vh"
      }  
    }
  }

  export const setWebsiteTransformOrigin = (website, rowIndex) => {
    if (rowIndex >= ROWS_PER_PAGE - CUSTOM_TRANSFORM_ORIGIN_COUNT) {
      website.bottomRow = true
    }  
    if (rowIndex <= CUSTOM_TRANSFORM_ORIGIN_COUNT) {
      website.topRow = true
    }
    if (website.columnIndex < CUSTOM_TRANSFORM_ORIGIN_COUNT) {
      website.leftCornerColumn = true
    }
    if (website.columnIndex > COLUMNS_PER_ROW - CUSTOM_TRANSFORM_ORIGIN_COUNT) {
      website.rightCornerColumn = true
    }
    return website
  }

  export const setCornerCellsStyles = (website, rowIndex) => { 
    if (rowIndex === 0 && website.columnIndex === 0) {
      website.topLeftBorderCell = true
    }
    if (rowIndex === 0 && website.columnIndex === COLUMNS_PER_ROW) {
      website.topRightBorderCell = true
    }
    if (rowIndex === (ROWS_PER_PAGE - 1) && website.columnIndex === 0) {
      website.bottomLeftBorderCell = true
    } 
    if (rowIndex === (ROWS_PER_PAGE - 1) && website.columnIndex === COLUMNS_PER_ROW) {
      website.bottomRightBorderCell = true
    }
    return website
  }

  export const handleGetWebsiteRequestParams = (pageIndex, category, country) => { 
    const getWebsitesURL = 'api/websites'
    let apiURL
    if (country.value !== undefined && category.value !== undefined) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&category=${category.value}&country=${country.value}`
    } else if (country.value !== undefined) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&country=${country.value}`
    } else if (category.value !== undefined) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&category=${category.value}`
    } else {
      apiURL = `${getWebsitesURL}?page=${pageIndex}`
    } 
    return apiURL
  }

  export const handleMobileGetWebsiteRequestParams = (pageIndex, category, country) => {     
    const getWebsitesURL = 'api/websites'
    let apiURL    
    if (!objectEmpty(country) && !objectEmpty(category)) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&category=${category.value}&country=${country.value}`
    } else if (!objectEmpty(country)) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&country=${country.value}`
    } else if (!objectEmpty(category)) {
      apiURL = `${getWebsitesURL}?page=${pageIndex}&category=${category.value}`
    } else {
      apiURL = `${getWebsitesURL}?page=${pageIndex}`
    }     
    return apiURL
  }

  const objectEmpty = (object) => { return !Object.keys(object).length }

