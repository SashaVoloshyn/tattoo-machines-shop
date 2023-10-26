import Head from 'next/head'
import AuthPage from "@/components/templates/AuthPage/AuthPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";


 function Auth() {

   const { shouldLoadContent } = useRedirectByUserCheck(true)
  return (
    <>
      <Head>
        <title>My TattooMachines SHOP | {shouldLoadContent? 'Авторизація' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon.svg" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth;
