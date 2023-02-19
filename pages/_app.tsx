import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.sessions}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App;