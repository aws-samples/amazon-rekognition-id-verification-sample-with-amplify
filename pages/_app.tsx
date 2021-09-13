import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/bootstrap5.dashboard.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
