import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import '../assets/Header.css';
import { withTranslation } from "react-i18next";
import LanguageSelector from './LanguageSelector';


const Header = (props) => {
  return (
    <Jumbotron style={{ textAlign: "center", margin: '2% 15% 4% 15%' }}>
      <h2 style={{padding: '0 10% 0 10%'}}>{props.t("header.label")}</h2>
      <LanguageSelector style={{position: 'absolute', top: '0', right: '0'}} />
    </Jumbotron>
  );
};

export default withTranslation()(Header);
