import {ROWS_PER_PAGE, COLUMNS_PER_ROW, CONTAINER_PADDING } from "../util/variables"
import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export function getTableParams (container) {
     return {
        tableHeight: container.offsetHeight,
        tableWidth: container.offsetWidth,
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
    optionsArray.forEach(country => { 
      if (country.subcategories) {
        country.subcategories.forEach(subcategory => { 
          options.push(subcategory)
        })
      }
      options.push(country)
    })
    return options
  }