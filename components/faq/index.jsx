import FaqContent from "./FaqContent";

const index = () => {
  return (
    <>
      {/* <!-- Our FAQ --> */}
      <section className="about our-faq bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Frequently Asked Questions</h2><br />
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="faq_content">
                <div className="faq_according">
                  <FaqContent />
                </div>

                <br />
                <br />

                <h1
                  style={{
                    fontSize: "14px",
                    fontWeight: "lighter",
                    lineHeight: "1.5",
                  }}
                >
                  Looking for the best water purifier in Pune? Check out top brands like Kent and Aquaguard,
                  known for their RO water purifiers. Find good water purifier dealers in Pune who can help
                  with water purifier installation in Pune and water purifier service in Pune. Regular
                  maintenance and timely water purifier repair in Pune keep your purifier working well. There
                  are many options at different water purifier prices in Pune to match your budget, ensuring
                  you have clean, safe drinking water for your family. Whether you live in Moshi, Wakad, Pimple
                  Saudagar, Bavdhan, Kharadi, Katraj, Talegaon, Ravet, Punawale, or PCMC, you can find the right
                  purifier for your needs.
                </h1>
              </div>
            </div>


          </div>
          {/* End .row */}
        </div>
      </section>

    </>
  );
};

export default index;
