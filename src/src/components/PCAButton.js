import React from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

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
