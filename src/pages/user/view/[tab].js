/* eslint-disable */
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/user/view/UserViewPage'

const UserView = ({ tab, invoiceData }) => {
  return <UserViewPage tab={tab} invoiceData={invoiceData} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'billing-plan' } },
      { params: { tab: 'connection' } }
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // const res = await axios.get('/apps/invoice/invoices')
  // const invoiceData = res.data.allData

  return {
    props: {
      // invoiceData,
      tab: params?.tab
    }
  }
}

export default UserView
/* eslint-disable */
