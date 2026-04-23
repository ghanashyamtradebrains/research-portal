import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>

        {/*  */}

        {/* Preconnect for faster DNS/TLS and font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload most critical font (optional but helpful) */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&display=swap"
        />

        {/* Load Google Fonts normally, but with display=swap to avoid FOIT */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
          media="all"
        />

        {/* Combine Montserrat into same request if possible (smaller and cleaner) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
          media="all"
        />

        {/*  */}

        <link
          rel="preload"
          as="image"
          href="/_next/static/media/pie_chart_light.webp"
          type="image/webp"
        />

        {/*  */}

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "h0ll8dy60p");`,
          }}
        ></script>
      </Head>
      <body>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KWQ31WK1CK"
        ></script>
        <script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-165881368-2');
            gtag('config', 'AW-10925863041')
            gtag('config', 'G-KWQ31WK1CK');`,
          }}
        ></script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
