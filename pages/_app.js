import 'tailwindcss/tailwind.css'
import '../styles/app.css';
import 'react-responsive-modal/styles.css';

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
      <div className="font-rubik text-white bg-dark-1 box-border h-screen">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link
              href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"/>
            <title>Arctic Road Games</title>
        </Head>
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
