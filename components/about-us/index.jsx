import React, { useEffect, useState } from 'react';
import SectionsHead from '../../components/common/SectionsHead';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from "../../redux/actions/userActions";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Parser from 'html-react-parser';

const AboutUsDisplay = () => {
  const dispatch = useDispatch();
  const { about } = useSelector(state => state.about);
  const [contentHtml, setContentHtml] = useState('');

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  const options = {
    inlineStyleFn: (styles) => {
      const styleObj = {};
      styles.forEach((style) => {
        if (style.startsWith('color-rgb')) {
          const color = style.replace('color-rgb', 'rgb');
          styleObj.color = color;
        }
        if (style.startsWith('bgcolor-rgb')) {
          const bgColor = style.replace('bgcolor-rgb', 'rgb');
          styleObj.backgroundColor = bgColor;
        }
        if (style.startsWith('fontsize-')) {
          const fontSize = style.replace('fontsize-', '') + 'px';
          styleObj.fontSize = fontSize;
        }
        if (style.startsWith('fontfamily-')) {
          const fontFamily = style.replace('fontfamily-', '');
          styleObj.fontFamily = fontFamily;
        }
      });
      if (Object.keys(styleObj).length > 0) {
        return {
          element: 'span',
          style: styleObj,
        };
      }
    },
    blockStyleFn: (block) => {
      const blockStyle = {};
      if (block.getData().get('color')) {
        blockStyle.color = block.getData().get('color');
      }
      if (Object.keys(blockStyle).length > 0) {
        return {
          style: blockStyle,
        };
      }
    },
    entityStyleFn: (entity) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'image') {
        const data = entity.getData();
        return {
          element: 'img',
          attributes: {
            src: data.src,
          },
          style: {
            maxWidth: '100%',
          },
        };
      }
    },
  };

  useEffect(() => {
    if (about && about.about) {
      try {
        const contentState = convertFromRaw(JSON.parse(about.about));
        const html = stateToHTML(contentState, options);
        setContentHtml(html);
      } catch (error) {
        console.error('Error parsing content:', error);
      }
    }
  }, [about]);

  return (
    <div className='bg-page1'>
      <section className="about">
        <div className="container">
          <SectionsHead heading="About Us" /><br />
          <div className="about p-5" style={{ textAlign: "justify" }}>
            {/* Ensure Parser renders contentHtml as valid HTML */}
            {Parser(contentHtml)}

            <h1
              style={{
                fontSize: "16px",
                fontWeight: "lighter",
                lineHeight: "1.5",
              }}
            >
              <p>Looking for the best water purifier in Pune? Explore top RO water purifiers from brands like Kent and Aquaguard, known for their high-performance filtration systems. Whether you need a water purifier installation in Pune or regular water purifier service, finding trusted water purifier dealers in Pune is essential.</p>


              <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
                <div className="mb-5">
                  <h1 className="fw-bold text-primary mb-4">
                    Best Water Purifiers in Pune: Clean & Safe Drinking Water for Your Home
                  </h1>
                  <p className="lead text-muted">
                    Get clean and safe drinking water for your home with the best water purifiers in Pune.
                    Top brands like Kent and Aquaguard offer reliable RO water purifiers. You can easily
                    find a water purifier shop near me or a trusted water purifier dealer in Pune to help
                    with installation, service, and repairs.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="fw-bold mb-4">
                    Find a Water Purifier Shop or Dealer Near You
                  </h2>
                  <p className="lead text-muted">
                    Whether you need a water purifier for home, or you're looking for a water purifier on rent,
                    there are many choices to fit your needs and budget. Check the latest water purifier prices
                    in Pune before buying.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className=" fw-bold  mb-4">
                    Expert Water Purifier Service & Maintenance
                  </h2>
                  <p className="lead text-muted">
                    If you're searching for a water purifier service near me or a trusted water purifier service
                    in Pune, many providers offer quick help, including filter replacement, RO service, and AMC
                    (Annual Maintenance Contracts). Regular care helps your water purifier filters last longer and
                    keeps water clean.
                  </p>
                </div>

                <div>
                  <h2 className="fw-bold mb-4">Serving Major Areas in Pune and PCMC:</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Moshi
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Wakad
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Pimple Saudagar
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Bavdhan
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Kharadi
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Katraj
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Talegaon
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Ravet
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> Punawale
                        </li>
                        <li className="list-group-item bg-transparent d-flex align-items-center">
                          <i className="bi bi-geo-alt-fill text-primary me-2"></i> And all over PCMC
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </h1>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUsDisplay;
