import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import { useCallback } from 'react'
import AboutPage from "@/components/templates/AboutPage/AboutPage";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";

function About() {
  const getDefaultTextGenerator = useCallback(() => 'Доставка та оплата', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>My TattooMachines SHOP | Про компанію</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon.svg" />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <AboutPage/>
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default About
