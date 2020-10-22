import React from "react";
import LeftPanel from "./LeftPanel";
import VennDiagram1 from "./VennDiagram";

const DiagramPage = () => {
  return (
    <div className="row">
        <div className="col-4 settings" style={{margin: '0 2% 0 3%'}}>
            <LeftPanel />
        </div>
      <div className="col-7 diagram-section" style={{margin: '1% 1% 0', border: '1px solid gray', borderRadius: '25px', height: '95vh', right: '0'}}>
          <VennDiagram1 />
      </div>
    </div>
  );
};

export default DiagramPage;
