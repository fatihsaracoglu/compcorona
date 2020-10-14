import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import '../assets/Header.css';

const Header = () => {
  return (
    <Jumbotron style={{ textAlign: "center", margin: '2% 10% 4% 10%' }}>
      <h2 style={{padding: '0 10% 0 10%'}}>Koronavirüslere Konak Tepkisinin Karşılaştırmalı Transkriptom Analizi</h2>
    </Jumbotron>
  );
};

export default Header;
