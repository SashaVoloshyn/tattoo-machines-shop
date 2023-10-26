import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import ShippingPayment from '@/components/templates/ShippingPayment/ShippingPayment'
import React, { useCallback } from 'react'
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";

function ShippingPaymentPage() {
  const getDefaultTextGenerator = useCallback(() => 'Доставка та оплата', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>My TattooMachines SHOP | Доставка та оплата</title>
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
          <ShippingPayment />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default ShippingPaymentPage
