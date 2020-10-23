import React from "react";
import { withTranslation } from "react-i18next";

const Footer = (props) => {
  return (
    <footer style={{borderTop: '1px solid #A9A9A9'}}>
      <div className="text-center py-3">
  © 2020 SuzekLab | <a href="mailto:fatihsaracoglu@posta.mu.edu.tr" style={{color: '#4169E1', textDecoration: 'none'}}>{props.t("contact-us")}</a>
      </div>
    </footer>
  );
};

export default withTranslation()(Footer);
