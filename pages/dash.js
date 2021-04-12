import {useRequireAuth} from '../src/hooks/useRequireAuth'
import DashBoard from '../src/components/dashboard/Dashboard'
import Layout from '../src/components/Layout'

const Dashboard = () => {

  const auth = useRequireAuth()

  return (
    <Layout>
      {auth.user && <DashBoard />}
    </Layout>
  )
}

export default Dashboard