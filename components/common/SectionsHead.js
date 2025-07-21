import React from 'react';

const SectionsHead = ({ heading, subheading }) => {
    return (
        <div className="water-heading-container">
            <div className="water-heading-wrapper" role="heading" aria-level="2">
                <h2 className="water-main-heading" >
                    <span className="heading-text">{heading}</span>
                    <span className="water-wave" aria-hidden="true"></span>
                </h2>
                {/* {subheading &&
                    <p className="water-subheading">
                        <span className="subheading-text">{subheading}</span>
                    </p>
                } */}
            </div>
        </div>
    );
};

export default SectionsHead;