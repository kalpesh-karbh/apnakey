// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
// import axios from 'axios'

// ** Demo Components Imports
import CardStatisticsOrder from 'src/views/ui/cards/statistics/CardStatisticsOrder'
import CardStatisticsSales from 'src/views/ui/cards/statistics/CardStatisticsSales'
import CardStatisticsSquare from 'src/views/ui/cards/statistics/CardStatisticsSquare'
import CardStatisticsProfit from 'src/views/ui/cards/statistics/CardStatisticsProfit'
import CardStatisticsExpenses from 'src/views/ui/cards/statistics/CardStatisticsExpenses'
import CardStatisticsSessions from 'src/views/ui/cards/statistics/CardStatisticsSessions'
import CardStatisticsVertical from 'src/views/ui/cards/statistics/CardStatisticsVertical'
import CardStatisticsHorizontal from 'src/views/ui/cards/statistics/CardStatisticsHorizontal'
import CardStatisticsImpression from 'src/views/ui/cards/statistics/CardStatisticsImpression'
import CardStatisticsStatistics from 'src/views/ui/cards/statistics/CardStatisticsStatistics'
import CardStatisticsOrderVisits from 'src/views/ui/cards/statistics/CardStatisticsOrderVisits'
import CardStatisticsRevenueGrowth from 'src/views/ui/cards/statistics/CardStatisticsRevenueGrowth'
import CardStatisticsWithAreaChart from 'src/views/ui/cards/statistics/CardStatisticsWithAreaChart'
import CardStatisticsGeneratedLeads from 'src/views/ui/cards/statistics/CardStatisticsGeneratedLeads'
import CardStatisticsAvgDailyTraffic from 'src/views/ui/cards/statistics/CardStatisticsAvgDailyTraffic'
import CardStatisticsAverageDailySales from 'src/views/ui/cards/statistics/CardStatisticsAverageDailySales'
import CardStatisticsSubscribersOrders from 'src/views/ui/cards/statistics/CardStatisticsSubscribersOrders'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const CardStatistics = ({ apiData }) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <CardStatisticsStatistics />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardStatisticsSquare data={apiData.statsSquare} />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsOrder />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsSales />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsProfit />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsSessions />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsExpenses />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <CardStatisticsImpression />
        </Grid>
        <Grid item xs={12}>
          <CardStatisticsHorizontal data={apiData.statsHorizontal} />
        </Grid>
        <Grid item xs={12}>
          <CardStatisticsWithAreaChart data={apiData.statsWithAreaChart} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardStatisticsAverageDailySales />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardStatisticsOrderVisits />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardStatisticsAvgDailyTraffic />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardStatisticsSubscribersOrders />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardStatisticsVertical data={apiData.statsVertical} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardStatisticsRevenueGrowth />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardStatisticsGeneratedLeads />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}
const cardStatsData = {
  statsSquare: [
    {
      stats: '97.8k',
      title: 'Orders',
      avatarColor: 'error',
      icon: 'tabler:briefcase'
    },
    {
      stats: '3.4k',
      title: 'Review',
      avatarColor: 'success',
      icon: 'tabler:message-dots'
    }
  ],
  statsHorizontal: [
    {
      stats: '86%',
      icon: 'tabler:cpu',
      title: 'CPU Usage'
    },
    {
      stats: '1.24gb',
      icon: 'tabler:server',
      title: 'Memory Usage',
      avatarColor: 'success'
    },
    {
      stats: '0.2%',
      avatarColor: 'error',
      title: 'Downtime Ratio',
      icon: 'tabler:chart-pie-2'
    },
    {
      stats: '128',
      title: 'Issues Found',
      avatarColor: 'warning',
      icon: 'tabler:alert-octagon'
    }
  ],
  statsVertical: [
    {
      stats: '1.28k',
      chipColor: 'error',
      chipText: '-12.2%',
      avatarColor: 'error',
      title: 'Total Profit',
      subtitle: 'Last week',
      avatarIcon: 'tabler:credit-card'
    },
    {
      stats: '24.67k',
      chipText: '+25.7%',
      title: 'Total Sales',
      chipColor: 'success',
      subtitle: 'Last week',
      avatarColor: 'success',
      avatarIcon: 'tabler:credit-card'
    }
  ],
  statsWithAreaChart: [
    {
      stats: '92.6k',
      avatarIcon: 'tabler:users',
      title: 'Subscribers Gained',
      chartSeries: [{ data: [40, 4, 58, 12, 35, 10, 84] }]
    },
    {
      stats: '36.5%',
      chartColor: 'error',
      avatarColor: 'error',
      title: 'Quarterly Sales',
      avatarIcon: 'tabler:shopping-cart',
      chartSeries: [{ data: [44, 75, 24, 57, 6, 84] }]
    },
    {
      stats: '97.5k',
      chartColor: 'warning',
      avatarColor: 'warning',
      title: 'Orders Received',
      avatarIcon: 'tabler:package',
      chartSeries: [{ data: [30, 84, 11, 76, 0, 49, 9] }]
    },
    {
      stats: '91.8k',
      chartColor: 'success',
      avatarColor: 'success',
      title: 'Revenue Generated',
      avatarIcon: 'tabler:credit-card',
      chartSeries: [{ data: [6, 35, 25, 61, 32, 84, 70] }]
    }
  ],
  statsHorizontalWithDetails: [
    {
      stats: '21,459',
      title: 'Session',
      trendDiff: '+29',
      icon: 'tabler:user',
      subtitle: 'Total Users'
    },
    {
      stats: '4,567',
      trendDiff: '+18',
      title: 'Paid Users',
      avatarColor: 'error',
      icon: 'tabler:user-plus',
      subtitle: 'Last week analytics'
    },
    {
      stats: '19,860',
      trendDiff: '-14',
      trend: 'negative',
      title: 'Active Users',
      avatarColor: 'success',
      icon: 'tabler:user-check',
      subtitle: 'Last week analytics'
    },
    {
      stats: '237',
      trendDiff: '+42',
      title: 'Pending Users',
      avatarColor: 'warning',
      icon: 'tabler:user-exclamation',
      subtitle: 'Last week analytics'
    }
  ]
}

export const getStaticProps = async () => {
  // const res = await axios.get('/cards/statistics')
  // const apiData = res.data
  const apiData = cardStatsData

  return {
    props: {
      apiData
    }
  }
}

export default CardStatistics
