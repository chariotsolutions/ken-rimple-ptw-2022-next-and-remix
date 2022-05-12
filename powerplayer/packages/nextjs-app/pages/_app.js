import '../styles/globals.css';
import { SWRConfig } from 'swr';

import Link from 'next/link';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return  (
    <div className="container mx-auto my-auto">
      <Head>
        <title>Next.js PowerPlayer</title>
      </Head>
      <h1>NextJS PowerPlayer Demo</h1>
      <menu className="container my-5">
      <Link href="/swr/podcasts"><a className="btn-menu">Using SWR</a></Link>
      <Link href="/swr/podcasts?optimizeImages=true"><a className="btn-menu">Using SWR and Image component</a></Link>
      <Link href="/ssr/podcasts?optimizeImages=true"><a className="btn-menu">Using SSR</a></Link>
      <Link href="/ssg/podcasts?optimizeImages=true"><a className="btn-menu">Using SSG</a></Link>

      </menu>
      <hr/>

      <SWRConfig value={{
        refreshWhenHidden: true,
        refreshWhenOffline: true,
        refreshInterval: 400000}}>
        <div className="container">
          <Component { ...pageProps} />
        </div>
      </SWRConfig>
    </div>
  );
}

export default MyApp
