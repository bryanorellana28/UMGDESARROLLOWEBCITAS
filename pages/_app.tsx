// pages/_app.tsx
import Head from 'next/head';
import { AppProps } from 'next/app'; // Importa AppProps
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) { // Usa AppProps para definir el tipo
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
