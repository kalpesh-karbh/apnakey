/* eslint-enable */
import Grid from '@mui/material/Grid'

// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'
import CardWidgetsEarningReports from 'src/views/ui/cards/widgets/CardWidgetsEarningReports'

// import ChartjsLineChart from 'src/views/charts/chartjs/ChartjsLineChart'

// import { useTheme } from '@mui/material/styles'

// ** Actions
import { fetchData } from 'src/store/apps/dashboard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  // const theme = useTheme()

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state: any) => state?.dashboard?.allData)

  // @ts-ignore
  useEffect(() => {
    ;(dispatch as any)(fetchData())
  }, [dispatch])

  const statsWithAreaChartData1 = [
    {
      stats: `£ ${store?.totalEarning ?? 0}`,
      chartColor: 'success',
      avatarColor: 'success',
      avatarIcon: 'tabler:cash',
      title: 'Total Earning',
      chartSeries: [{ data: [40, 4, 58, 12, 35, 10, 84] }]
    }
  ]

  const statsWithAreaChartData2 = [
    {
      stats: `£ ${store?.annual ?? 0}`,
      chartColor: 'error',
      avatarColor: 'error',
      title: 'Annual Earning',
      avatarIcon: 'tabler:cash',
      chartSeries: [{ data: [44, 75, 24, 57, 6, 84] }]
    }
  ]

  const statsWithAreaChartData3 = [
    {
      stats: `£ ${store?.weeklyBooked ?? 0}`,
      chartColor: 'warning',
      avatarColor: 'warning',
      title: 'Weekly Earning',
      avatarIcon: 'tabler:cash',
      chartSeries: [{ data: [30, 84, 11, 76, 0, 49, 9] }]
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatsWithAreaChart data={statsWithAreaChartData1} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatsWithAreaChart data={statsWithAreaChartData2} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatsWithAreaChart data={statsWithAreaChartData3} />
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <CardWidgetsEarningReports />
      </Grid>
      {/* <Grid item xs={4} sm={4} md={4}>
        <CardWidgetsEarningReports />
      </Grid> */}
      {/* <Grid item xs={4} sm={4} md={4}>
        <ChartjsLineChart
          white={'#fff'}
          labelColor={theme.palette.text.disabled}
          success={'#d4e157'}
          borderColor={theme.palette.divider}
          legendColor={theme.palette.text.secondary}
          primary={'#8479F2'}
          warning={'#ff9800'}
        />
      </Grid> */}
    </Grid>
  )
}

export default Home
/* eslint-enable */
