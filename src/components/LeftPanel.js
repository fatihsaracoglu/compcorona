import React from "react";
import DropzoneContainer from "./DropzoneContainer";
import FileTable from "./FileTable";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import SelectPreprocessedData from './SelectPreprocessedData';
import { Tab } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

import "semantic-ui-css/semantic.min.css";
import "../assets/LeftPanel.css";

const LeftPanel = (props) => {
  const panes = [
    {
      menuItem: props.t("files"),
      render: () => (
        <div style={{ minHeight: "300px", marginTop: "7%" }}>
          <FileTable />
          <div className="container" style={{ marginTop: "4%" }}>
            <div className="row justify-content-center">
              <SelectPreprocessedData />
              <div style={{ margin: "0 4% 0 4%" }}>
                <FilterButton />
              </div>
              <VisualizeButton />
            </div>
          </div>
        </div>
      ),
    },
    {
      menuItem: props.t("new.file.upload"),
      render: () => (
        <div style={{ marginTop: "7%" }}>
          <DropzoneContainer />
        </div>
      ),
    },
  ];

  const activeIndex = FileStore.useState((s) => s.activeIndex);

  const handleTabChange = (e, { activeIndex }) => {
    FileStore.update((s) => {
      s.activeIndex = activeIndex;
    });
  };

  return (
    <div id="left-panel" style={{ marginTop: "5%" }}>
      <Tab
        menu={{ pointing: true }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default withTranslation()(LeftPanel);
