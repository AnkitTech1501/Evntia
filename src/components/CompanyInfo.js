import React from 'react';

const CompanyInfo = ({ companyName, pmName }) => (
    <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-palette-5-light-3 u-layout-wrap-1">
        <div className="u-gutter-0 u-layout">
            <div className="u-layout-row">
                <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                    <div className="u-container-layout u-container-layout-1">
                        <h4 className="u-text u-text-1">Company Name : {companyName} </h4>
                    </div>
                </div>
                <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                    <div className="u-container-layout u-container-layout-2">
                        <h4 className="u-text u-text-2">PM : {pmName}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default CompanyInfo;
