// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      sectionTitle: 'Activities'
    },
    {
      title: 'Calendar',
      path: '/calendar',
      icon: 'tabler:calendar'
    },
    {
      title: 'Timeline',
      path: '/timeline',
      icon: 'tabler:calendar-minus'
    },
    {
      title: 'Activities',
      path: '/group',
      icon: 'tabler:settings-star'
    },
    {
      title: 'Field Settings',
      path: '/fields',
      icon: 'tabler:ball-football'
    },
    {
      sectionTitle: 'EVENTS'
    },
    {
      title: 'Events',
      path: '/events',
      icon: 'tabler:music'
    },
    {
      sectionTitle: 'OTHERS'
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: 'tabler:file-invoice'
    },
    {
      title: 'Support & FAQs',
      path: '/faq',
      icon: 'tabler:lifebuoy'
    },
    {
      title: 'Account',
      path: '/account-settings',
      icon: 'tabler:user'
    }
  ]
}

export default navigation
