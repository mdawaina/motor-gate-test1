import React from "react";

function accordion() {
  return (
    <div className="container">
      <div id="accordion">
        {/* <!-- Motor Brand --> */}
        <div className="card">
          <div className="card-header">
            <a className="card-link" data-toggle="collapse" href="#collapseOne">
              Motor Brand 1
            </a>
          </div>
          <div id="collapseOne" className="collapse" data-parent="#accordion">
            <div className="card-body">
              {/* <!-- Motor Model --> */}
              <div id="nestedAccordion1">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseOneOne"
                    >
                      Motor Model 1
                    </a>
                  </div>
                  <div
                    id="collapseOneOne"
                    className="collapse"
                    data-parent="#nestedAccordion1"
                  >
                    <div className="card-body">
                      {/* <!-- Motor Year --> */}
                      <div id="nestedAccordion2">
                        <div className="card">
                          <div className="card-header">
                            <a
                              className="card-link"
                              data-toggle="collapse"
                              href="#collapseOneOneOne"
                            >
                              Motor Year 1
                            </a>
                          </div>
                          <div
                            id="collapseOneOneOne"
                            className="collapse"
                            data-parent="#nestedAccordion2"
                          >
                            <div className="card-body">
                              <input
                                type="checkbox"
                                id="year1"
                                name="year1"
                                value="Year1"
                              />
                              <label htmlFor="year1"> 2023</label>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Motor Year --> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Motor Model --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default accordion;
