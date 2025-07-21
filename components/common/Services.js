import React from 'react';
import SectionsHead from './SectionsHead';
import servicesData from '../../data/servicesData';
import Link from 'next/link';

const Services = () => {
  return (
    <section id="services" className="section bg-poster2">
      <div className="container">
        <SectionsHead heading="Why Choose Us for the Best RO Water Purifiers in Pune" />
        <div className="wrapper services_wrapper">
          {servicesData.map((item) => {
            return <ServiceItem key={item.id} {...item} />;
          })}
        </div>
        <br />

        <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
          <div className="mb-4">
            <h2 className="fw-bold mb-3 fs-5">
              Best Water Purifiers in Pune: Why choose RO water purifiers?
            </h2>
            <p className="lead text-muted fs-6">
              Get clean and safe drinking water for your home with the <span className='text-info'><Link href="/all-products?product=Lexpure%20Water%20Purifier"> best water purifiers in Pune.</Link></span>
              Top brands like Kent and Aquaguard offer reliable RO water purifiers.
            </p>
            <p className="lead text-muted fs-6">
              You can easily
              find a water purifier shop near me or a trusted water purifier dealer in Pune to help
              with installation, service, and repairs — ensuring clean, safe drinking water for your family.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="fw-bold mb-3 fs-5">
              Buy Copper RO Water Purifier in Pune
            </h2>
            <p className="lead text-muted fs-6">
              Want safe, mineral-rich drinking water? Our advanced <span className='text-info'><Link href="/all-products?product=PUROSIS%20-%20FINPURE" className="text-primary">copper RO water purifiers</Link></span> in Pune come with TDS control and copper enhancement. Perfect for homes and offices.
            </p>
            <p className="lead text-muted fs-6">
              We offer full <strong>installation, AMC service</strong>, and fast delivery across Pune and PCMC. Brands like Kent, Aquaguard, and Lexpure available.
              Explore our copper RO models .
            </p>
          </div>

          {/* Rent Water Purifier Section */}
          <div className="mb-4">
            <h2 className="fw-bold mb-3 fs-5">
              Water Purifier on Rent in Pune
            </h2>
            <p className="lead text-muted fs-6">
              Need a short-term solution? Get a <strong>water purifier on rent in Pune</strong> at affordable monthly rates. No maintenance cost, free installation, and doorstep delivery included.
            </p>
            <p className="lead text-muted fs-6">
              Ideal for students, rented apartments, and corporate offices. Browse rental products and start today.
            </p>
          </div>

          {/* General Services Section */}
          <div className="mb-4">
            <h2 className="fw-bold mb-3 fs-5">
              Water Purifier Service & AMC in Pune
            </h2>
            <p className="lead text-muted fs-6">
              Searching for a <span className='text-info'><Link href="/all-products?product=Under%20Sink%20Water%20Purifier" className="text-primary">trusted water purifier service near me</Link></span>? SGSRO provides RO/UV filter service, repair, and AMC packages across Pune.
              Check out top brands like Kent and Aquaguard,
              known for their RO water purifiers.
            </p>
            <p className="lead text-muted fs-6">
              Find good water purifier dealers in Pune who can help
              with water purifier installation in pune and water purifier service in Pune.
            </p>
            <p className="lead text-muted fs-6">
              Regular
              maintenance and timely water purifier repair in pune keep your purifier working well. Explore a wide range of
              top water purifiers price list to match your budget, ensuring
              you have clean, safe drinking water for your family. Whether you live in Moshi, Wakad, Pimple
              Saudagar, Bavdhan, Kharadi, Katraj, Talegaon, Ravet, Punawale, or PCMC, you can find the right
              purifier for your needs.
            </p>
          </div>

          {/* Area List */}
          <div>
            <h2 className="fw-bold mb-3 fs-5"> Major Service Areas in Pune and PCMC:</h2>
            <div className="row fs-6">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Moshi
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Talegaon
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Ravet
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Pimpri Chinchwad
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Punawale
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Akurdi
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Nigdi
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Chikhali
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> Chakan
                  </li>
                  <li className="list-group-item bg-transparent d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i> All over PCMC
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ServiceItem = React.memo(({ icon, title, info }) => {
  return (
    <div className="services_card">
      <div className="services_icon">{icon}</div>
      <div className="services_details">
        <h4>{title}</h4>
        <p>{info}</p>
      </div>
    </div>
  );
});

export default Services;
