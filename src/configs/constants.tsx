/* eslint-disable */
import { useSelector } from 'react-redux'

// Constants
export const themeColor = '#003874'
export const hoverColor = '#002f61'
export const borderColor = '#003874'
export const cancelColor = 'red'
// export const mainDomainUrl = `http://192.168.1.16:8000`;
// export const mainDomainUrl = `http://127.0.0.1:8000`;
export const mainDomainUrl = `https://karbh.website`
export const webUrl = `https://windywebapp.karbh.com`

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
/* eslint-disable */
