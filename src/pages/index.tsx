import Layout from '@theme/Layout'
import HomepageMain from '../components/HomepageMain'

export default function Home(): JSX.Element {
  return (
    <Layout noFooter={true}>
      <HomepageMain/>
    </Layout>
  )
}
