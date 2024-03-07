/* eslint-disable */
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:circle-dot' />

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:circle' />

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width='150' height='80' viewBox='0 0 713 184' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_3193_13981)'>
              <path
                d='M133.16 54.51L166.49 87.84C167.22 88.57 167.22 89.76 166.49 90.49L151.95 105.03C151.22 105.76 150.03 105.76 149.3 105.03L117.82 73.55C116.64 72.37 114.62 73.21 114.62 74.88V96.02C114.62 98.05 111.93 98.79 110.91 97.03C106.12 88.71 99.39 81.65 91.36 76.44C90.69 76 90.28 75.25 90.28 74.44V1.88C90.28 0.84 91.12 0 92.16 0H112.75C113.79 0 114.63 0.84 114.63 1.88V31.49C114.63 33.16 116.65 34 117.83 32.82L149.29 1.33C150.02 0.6 151.21 0.6 151.94 1.33L166.48 15.87C167.21 16.6 167.21 17.79 166.48 18.52L133.15 51.86C132.42 52.59 132.42 53.78 133.15 54.51H133.16Z'
                fill='#030430'
              />
              <path
                d='M90.2501 80.9201C81.2601 74.7401 70.3501 71.1201 58.6001 71.1201C48.5801 71.1201 39.1601 73.7601 31.0201 78.3801C14.0601 88.0001 2.62012 106.23 2.62012 127.12C2.62012 148.01 14.0701 166.22 31.0301 175.84C39.1701 180.46 48.5801 183.09 58.6001 183.09C69.1301 183.09 78.9901 180.17 87.4001 175.12C88.6501 174.37 90.2501 175.25 90.2501 176.72V181.22C90.2501 182.25 91.0901 183.09 92.1201 183.09H112.72C113.75 183.09 114.59 182.25 114.59 181.22V127.11C114.59 107.93 104.95 91.0301 90.2501 80.9001V80.9201ZM90.2501 127.96C89.8101 145.04 75.8301 158.77 58.6101 158.77C49.2201 158.77 40.8001 154.69 35.0001 148.21C34.0501 147.14 34.6001 145.44 36.0001 145.14C43.4101 143.53 50.0101 139.19 54.4301 133.01C54.6101 132.77 54.3601 132.45 54.0801 132.56C48.4301 134.92 42.0301 135.63 35.6001 134.19C32.9101 133.59 30.4001 132.65 28.0801 131.44C27.5101 131.14 27.1201 130.57 27.0701 129.93C26.9901 129.01 26.9501 128.08 26.9501 127.13C26.9501 109.4 41.5001 95.0801 59.3101 95.4601C76.0801 95.8201 89.7701 109.44 90.2601 126.2C90.2601 126.37 90.2601 126.53 90.2601 126.69C90.2601 126.83 90.2601 126.98 90.2601 127.12V127.14C90.2601 127.41 90.2601 127.69 90.2601 127.96H90.2501Z'
                fill='url(#paint0_linear_3193_13981)'
              />
              <path
                d='M90.2501 127.96C89.8001 154.99 67.7501 176.77 40.6001 176.77C40.5701 176.77 40.5301 176.77 40.5001 176.77C34.2701 176.76 28.2201 174.55 23.3801 170.63C10.7201 160.36 2.63013 144.68 2.63013 127.13C2.63013 109.58 10.7201 93.88 23.3701 83.61C28.2101 79.68 34.2601 77.47 40.5001 77.46C40.5301 77.46 40.5701 77.46 40.6001 77.46C67.7201 77.46 89.7501 99.19 90.2401 126.19C89.7501 109.43 76.0601 95.81 59.2901 95.45C41.4801 95.07 26.9301 109.39 26.9301 127.12C26.9301 128.41 27.0101 129.68 27.1601 130.93C29.7301 132.39 32.5601 133.5 35.5901 134.18C42.0201 135.62 48.4201 134.91 54.0601 132.55C54.3301 132.44 54.5901 132.75 54.4101 133C49.9901 139.18 43.3901 143.52 35.9801 145.13C34.5801 145.43 34.0301 147.14 34.9801 148.21C40.7801 154.69 49.2001 158.77 58.5901 158.77C75.8101 158.77 89.7901 145.04 90.2301 127.96H90.2501Z'
                fill='url(#paint1_linear_3193_13981)'
              />
              <path
                d='M90.26 126.68C90.26 126.52 90.26 126.35 90.25 126.19C90.25 126.21 90.25 126.22 90.25 126.24C90.25 126.39 90.25 126.54 90.25 126.69L90.26 126.68Z'
                fill='url(#paint2_linear_3193_13981)'
              />
              <path
                d='M236.22 52.4102C213.26 52.4102 199.55 66.0202 199.55 88.8202V138.51H211.56V111.2H260.75V138.51H273V88.8202C273 66.0202 259.25 52.4102 236.22 52.4102ZM236.1 63.9202C252 63.9202 260.75 72.7602 260.75 88.8202V99.7002H211.56V88.8202C211.56 72.7602 220.27 63.9202 236.09 63.9202H236.1Z'
                fill='#18181A'
              />
              <path
                d='M316.65 72.2698C296.38 72.2698 282.22 86.3798 282.22 106.57V166.32H293.85V129.38C299.33 136.2 307.98 140.13 318.01 140.13C337.38 140.13 351.44 125.96 351.44 106.44C351.44 86.9198 336.81 72.2598 316.64 72.2598L316.65 72.2698ZM316.77 129.11C303.28 129.11 293.85 119.68 293.85 106.19C293.85 92.6998 303.28 83.2698 316.77 83.2698C330.26 83.2698 339.69 92.6998 339.69 106.19C339.69 119.68 330.27 129.11 316.77 129.11Z'
                fill='#18181A'
              />
              <path
                d='M423.65 104.841V138.521H412.01V104.841C412.01 91.1405 404.61 83.2805 391.71 83.2805C378.81 83.2805 371.4 91.1405 371.4 104.841V138.521H359.77V104.841C359.77 84.4505 371.71 72.2705 391.71 72.2705C411.71 72.2705 423.65 84.4405 423.65 104.841Z'
                fill='#18181A'
              />
              <path
                d='M467.62 72.2806C457.49 72.0506 448.33 75.4206 441.83 81.7706C435.47 88.0006 431.97 96.8106 431.97 106.571C431.97 126.021 446.02 140.131 465.4 140.131C475.97 140.131 484.83 135.791 490.18 128.241V138.521H501.19V107.021C501.19 88.2806 486.13 72.7006 467.62 72.2806ZM466.64 129.121C458.11 129.121 451.21 125.351 447.3 119.171C453.43 118.621 459.01 115.351 462.49 110.361C462.64 110.141 462.4 109.861 462.15 109.961C458.4 111.581 454.14 112.121 449.84 111.251C447.7 110.821 445.69 110.081 443.88 109.071C443.78 108.141 443.73 107.181 443.73 106.201C443.73 92.7106 453.15 83.2806 466.64 83.2806C480.13 83.2806 489.56 92.7106 489.56 106.201C489.56 119.691 480.13 129.121 466.64 129.121Z'
                fill='#18181A'
              />
              <path
                d='M576.36 138.51H559.8L522.67 101.961V138.51H510.41V54.0205H522.67V89.6905L558.81 54.0205H575.1L532.32 95.7705L576.36 138.51Z'
                fill='#18181A'
              />
              <path
                d='M639.83 106.201C639.83 86.5405 625.35 72.2705 605.4 72.2705C585.45 72.2705 570.73 86.5405 570.73 106.201C570.73 125.861 585.31 140.141 605.4 140.141C619.85 140.141 632 132.561 637.09 120.381L638.05 118.081H625.53L625.05 118.931C621.36 125.511 614.38 129.131 605.4 129.131C593.45 129.131 584.59 121.761 582.82 110.601H639.82V106.211L639.83 106.201ZM605.4 83.2805C616.54 83.2805 625.01 89.7105 627.45 99.8205H583.2C585.61 89.7105 594.11 83.2805 605.4 83.2805Z'
                fill='#18181A'
              />
              <path
                d='M713 73.8799V134.62C713 154.77 701.22 166.32 680.68 166.32C665.14 166.32 653.59 158.5 649.8 145.39L649.19 143.27H660.85L661.26 144.32C664.89 153.7 673.83 155.67 680.68 155.67C694.4 155.67 701.36 148.68 701.36 134.87V130.27C696.4 136.43 688.93 139.76 679.8 139.76C660.87 139.76 649.1 127.28 649.1 107.19V73.8799H660.73V107.19C660.73 120.89 668.13 128.74 681.04 128.74C693.95 128.74 701.35 120.68 701.35 107.19V73.8799H712.98H713Z'
                fill='#18181A'
              />
              <path
                d='M89.8801 126.24C89.8801 126.08 89.8801 125.92 89.8701 125.75C89.8701 125.77 89.8701 125.78 89.8701 125.8C89.8701 125.95 89.8701 126.09 89.8701 126.24H89.8801Z'
                fill='#18181A'
              />
            </g>
            <defs>
              <linearGradient
                id='paint0_linear_3193_13981'
                x1='2.62012'
                y1='127.11'
                x2='114.59'
                y2='127.11'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.4' stop-color='#2FF4AD' />
                <stop offset='0.56' stop-color='#26E5AD' />
                <stop offset='0.86' stop-color='#0EBEAF' />
                <stop offset='1' stop-color='#02AAB0' />
              </linearGradient>
              <linearGradient
                id='paint1_linear_3193_13981'
                x1='-16.4399'
                y1='127.12'
                x2='96.1901'
                y2='127.12'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#2FF4AD' />
                <stop offset='1' stop-color='#02AAB0' />
              </linearGradient>
              <linearGradient
                id='paint2_linear_3193_13981'
                x1='90.25'
                y1='126.44'
                x2='90.26'
                y2='126.44'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#02AAB0' />
                <stop offset='1' stop-color='#2FF4AD' />
              </linearGradient>
              <clipPath id='clip0_3193_13981'>
                <rect width='713' height='183.1' fill='white' />
              </clipPath>
            </defs>
          </svg>
          {/* <HeaderTitle variant='h4' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2.5 }) }}>
            {themeConfig.templateName}
          </HeaderTitle> */}
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, color: 'text.secondary', backgroundColor: 'transparent !important' }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
/* eslint-disable */
