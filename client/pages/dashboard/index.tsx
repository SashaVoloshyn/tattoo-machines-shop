import Head from 'next/head'
import DashboardPage from "@/components/templates/DashboardPage/DashboardPage";
import Layout from "@/components/layout/Layout";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";


function Dashboard() {

  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''
  return (
    <>
      <Head>
        <title>My TattooMachines SHOP {shouldLoadContent ? 'Головна' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Dashboard;
