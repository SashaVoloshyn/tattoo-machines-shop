import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import Custom404 from '../404'
import { $tattooMachine, setTattooMachine } from "@/context/tattooMachine";
import { getTattooMachineFx } from "@/app/api/tattooMachines";
import MachinePage from "@/components/templates/MachinePage/MachinePage";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";

function CatalogMachinePage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const tattooMachine = useStore($tattooMachine)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadTattooMachine()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = tattooMachine.name
    }
  }, [lastCrumb, tattooMachine])

  const loadTattooMachine = async () => {
    try {
      const data = await getTattooMachineFx(`/tattoo-machines/find/${query.machineId}`)

      if (!data) {
        setError(true)
        return
      }

      setTattooMachine(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>My TattooMachines SHOP | {shouldLoadContent ? tattooMachine.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <MachinePage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogMachinePage
