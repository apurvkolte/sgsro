import Head from "next/head";

const Seo = ({ pageTitle, font }) => {
  const title = pageTitle
    ? `${pageTitle} | Best Water Purifiers in Pune | Copper RO, Rental & Service`
    : "SGSRO - Best Water Purifiers in Pune | Copper RO Water Purifier | Rent & Service";

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content="Buy or rent the best copper RO water purifier in Pune. SGSRO offers affordable water purifiers with copper tank, home delivery, installation, AMC & repair services across PCMC and Pune." />
      <meta name="keywords" content="Best water purifier in Pune, Water purifier service Pune, RO water purifier Pune, Water purifier dealers in Pune, copper ro water purifier, copper water purifier, best copper ro water purifier, ro copper water purifier, best water purifier in pune, copper ro, water purifier in pune, Kent, Aquaguard, Water purifier AMC Moshi, Pune" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Best Water Purifier in Pune | RO, UV Filters, Rental & AMC Service" />
      <meta property="og:description" content="Get top-rated copper RO water purifiers for your home in Pune. Rent or buy in Moshi, Akurdi, Ravet, Nigdi, Chikhali, and nearby areas." />
      <meta property="og:type" content="business.business" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content="https://www.sgsro.com" />
      <meta property="og:site_name" content="Kent Aquaguard" />
      <meta property="og:image" content="https://www.sgsro.com/images/logo.png" />
      <meta property="business:contact_data:street_address" content="Moshi, Akurdi, Pimpri Chinchwad, Nigdi, Chikhali, Chakan, Talegaon, Ravet, Punawale, PCMC, Pune, Maharashtra, India" />
      <meta property="business:contact_data:locality" content="Pune" />
      <meta property="business:contact_data:region" content="Maharashtra" />
      <meta property="business:contact_data:country_name" content="India" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="canonical" href="https://www.sgsro.com" />
      <link rel="alternate" hrefLang="en-IN" href="https://www.sgsro.com" />
      <meta name="google-site-verification" content="b4n3cJcOcS4yagloh7-PVI92RBOdqh78DNZZGKPwHSg" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" integrity="sha384-+0X0Ihsl5+1Ckqz3uYDvnu4JwvqQyzAwb0m81LXQBvPrW4eRjuAoKBR8gi5OyDiG" crossOrigin="anonymous" />
      <link rel="icon" href="favicon.ico" />
      {font && <link href={font} rel="stylesheet" />}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://www.sgsro.com#localbusiness",
          "name": "SGSRO - Best Copper RO Water Purifiers in Pune",
          "url": "https://www.sgsro.com",
          "logo": "https://www.sgsro.com/images/logo.png",
          "image": "https://www.sgsro.com/images/logo.png",
          "description": "Buy or rent high-quality copper RO water purifiers in Pune. SGSRO offers affordable water purifier rental, installation, AMC & service in PCMC & Pune.",
          "telephone": "+918007779657",
          "email": "info@sgsro.com",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bhosari, Chinchwad",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "412105",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "18.6228",  // Approx coordinates for Bhosari
            "longitude": "73.8507"
          },
          "areaServed": [
            "Pune",
            "PCMC",
            "Akurdi",
            "Bhosari",
            "Ravet",
            "Wakad",
            "Hinjewadi",
            "Nigdi",
            "Pimpri",
            "Chinchwad",
            "Moshi",
            "Chakan",
            "Talegaon",
            "Thergaon",
            "Baner",
            "Balewadi",
            "Hadapsar",
            "Viman Nagar"
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
            "https://www.facebook.com/rowaterpurifierspune",
            "https://www.instagram.com/zope.vaibhav"
          ]
        })}
      </script>


      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17238500493"></script>
      <script id="gtag-ads" dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'AW-17238500493');
    `
      }} />

      {/* Google Analytics (GA4) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PMK015DTT6"></script>
      <script id="gtag-analytics" dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-PMK015DTT6');
    `
      }} />

    </Head>
  );
};

export default Seo;
