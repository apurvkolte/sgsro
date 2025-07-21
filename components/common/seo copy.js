import Head from "next/head";

const Seo = ({ pageTitle, font }) => {
  const title = pageTitle
    ? `${pageTitle} | Best Water Purifiers in Pune | Copper RO, Rental & Service`
    : "SGSRO - Best Water Purifiers in Pune | Copper RO Water Purifier | Rent & Service";

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content="Best water purifier in Pune. Copper RO Water Purifier, water purifiers with copper tank. Get installation, repair, and filters for home use across Pune & PCMC." />
      <meta name="keywords" content="Best water purifier in Pune, Water purifier service Pune, water purifier for home, RO water purifier Pune, Water purifier dealers in Pune, Water purifier installation Pune, Water purifier repair Pune, copper ro water purifier, copper water purifier, ro copper water purifier, best copper ro water purifier, Water purifiers for home, RO UV UF filters, Water purifier filters, copper ro, Kent, Aquaguard, Water purifier AMC Moshi, Pune" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Best Water Purifier in Pune | RO, UV Filters, Rental & AMC Service" />
      <meta property="og:description" content="copper ro water purifier. RO filter installation, repair, AMC, and home delivery in Moshi, Akurdi, Ravet, Nigdi, Chikhali, and nearby areas." />
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
      <link rel="alternate" hreflang="en-IN" href="https://www.sgsro.com" />
      <meta name="google-site-verification" content="b4n3cJcOcS4yagloh7-PVI92RBOdqh78DNZZGKPwHSg" />

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" integrity="sha384-+0X0Ihsl5+1Ckqz3uYDvnu4JwvqQyzAwb0m81LXQBvPrW4eRjuAoKBR8gi5OyDiG" crossOrigin="anonymous" />

      {font && <link href={font} rel="stylesheet" />}
      <link rel="icon" href="favicon.ico" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "SGSRO",
          "url": "https://www.sgsro.com/",
          "logo": "https://www.sgsro.com/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+918007779657",
            "contactType": "Services"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "412105",
            "streetAddress": "bhosari , Chinchwad, India, Maharashtra"
          },
          "areaServed": [
            "Aundh",
            "Balewadi",
            "Baner",
            "Bavdhan",
            "Bhosari",
            "Camp",
            "Chakan",
            "Dange Chowk",
            "Deccan",
            "Erandwane",
            "Hadapsar",
            "Hinjewadi",
            "Kalewadi",
            "Kalyani Nagar",
            "Karve Road",
            "Koregaon Park",
            "Kothrud",
            "Magarpatta",
            "Nanded City",
            "Pashan",
            "Pimpri",
            "Pimple Gurav",
            "Pimple Nilakh",
            "Pimple Saudagar",
            "Sangvi",
            "Shivaji Nagar",
            "Sinhagad Road",
            "Thergaon",
            "Viman Nagar",
            "Wakad",
            "Aurangabad"
          ],
          "sameAs": [
            " https://www.facebook.com/rowaterpurifierspune/ ",
            " https://www.instagram.com/zope.vaibhav/ ",
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "sgsro",
          "image": "https://www.sgsro.com/images/logo.png",
          "@id": "https://www.sgsro.com#localbusiness",
          "email": "info@sgsro.com",
          "foundingDate": "2023",
          "url": "https://www.sgsro.com",
          "telephone": "084210 60192",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "bhosari , Chinchwad, India, Maharashtra, Pune, Maharashtra",
            "addressLocality": "Pune",
            "postalCode": "412105",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
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
        })}
      </script>

    </Head>
  );
};

export default Seo;
