import React from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";
import sars from "../data/SARS-GSE56192.csv";
import mers from "../data/MERS-GSE139516.csv";
import mers2 from "../data/MERS-GSE56192.csv";
import sarscov2 from "../data/SARS_COV_2-GSE120934.csv";
import sarscov22 from "../data/SARS_COV_2-GSE147507.csv";
import pca_data from "../data/pca_data.csv";
import * as d3 from "d3";

const PCAButton = (props) => {

  return (
    <div>
      <Button
        className="shadow-none"
        variant="outline-primary"
        size="sm"
      >
        <i className="file icon"></i> {props.t("preprocessed.pca.button.title")}
      </Button>
    </div>
  );
};

export default withTranslation()(PCAButton);
