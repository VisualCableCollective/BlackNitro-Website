import 'tailwindcss/tailwind.css'
import '../styles/app.css';
import 'react-responsive-modal/styles.css';

import Head from "next/head";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useMemo} from "react";

function MyApp({ Component, pageProps }) {
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark',
                },
            }),
        [],
    );

  return (
      <div className="font-roboto text-white bg-dark-1 box-border min-h-screen">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"/>
            <title>Arctic Road Games</title>
        </Head>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider >
      </div>
  )
}

export default MyApp
