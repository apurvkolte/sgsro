import Head from "next/head";

const Seo = ({ pageTitle, font }) => {
  const title = pageTitle
    ? `${pageTitle} | Service`
    : "service";

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:type" content="business.business" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content="https://www.example.com" />
      <meta property="og:site_name" content="Kent Aquaguard" />
      <meta property="og:image" content="" />
      <meta property="business:contact_data:street_address" content="" />
      <meta property="business:contact_data:locality" content="" />
      <meta property="business:contact_data:region" content="" />
      <meta property="business:contact_data:country_name" content="India" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="canonical" href="" />
      <link rel="alternate" hrefLang="en-IN" href="" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" integrity="sha384-+0X0Ihsl5+1Ckqz3uYDvnu4JwvqQyzAwb0m81LXQBvPrW4eRjuAoKBR8gi5OyDiG" crossOrigin="anonymous" />
      <link rel="icon" href="favicon.ico" />
      {font && <link href={font} rel="stylesheet" />}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "#localbusiness",
          "name": "",
          "url": "",
          "logo": "",
          "image": "",
          "description": "",
          "telephone": "+",
          "email": "",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "",
            "addressRegion": "",
            "postalCode": "",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "",  // Approx coordinates for Bhosari
            "longitude": ""
          },
          "areaServed": [

          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:30",
              "closes": "18:30"
            }
          ],
          "sameAs": [

          ]
        })}
      </script>


      <script async src=""></script>
      <script id="gtag-ads" dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      
    `
      }} />

      {/* Google Analytics (GA4) */}
      <script async src=""></script>
      <script id="gtag-analytics" dangerouslySetInnerHTML={{
        __html: `
   
    `
      }} />

    </Head>
  );
};

export default Seo;
