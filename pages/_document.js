import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Langar&family=Nunito:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-nunito">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
