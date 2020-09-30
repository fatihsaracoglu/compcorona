import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const Header = () => {
  return (
    <Jumbotron style={{ textAlign: "center", marginTop: "2%" }}>
      <h1>Test!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices
        purus tortor, sed rutrum quam venenatis vel. Integer pulvinar faucibus
        ante, eu facilisis lectus condimentum vitae. Interdum et malesuada fames
        ac ante ipsum primis in faucibus. Donec a volutpat odio. Fusce in tempor
        justo. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Nulla finibus gravida cursus. Quisque
        vel vehicula dui. Pellentesque vitae dapibus magna. Etiam eget risus
        leo. Praesent a ornare diam, vitae tempus elit. Duis mattis odio tellus,
        vitae fermentum justo posuere scelerisque. Nullam sodales ante id varius
        finibus.
      </p>
    </Jumbotron>
  );
};

export default Header;
