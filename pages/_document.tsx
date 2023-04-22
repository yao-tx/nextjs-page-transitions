import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Experimenting page transition animations using Framer Motion with Next.js"
        />
        <meta
          name="og:description"
          content="Experimenting page transition animations using Framer Motion with Next.js"
        />
        <meta
          name="og:title"
          content="Page transitions with Next.js and Framer Motion"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
