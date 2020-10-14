import React from "react";
import Header from "./Header";
import FileSection from "./FileSection";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import VennDiagram from "./VennDiagram";

var data = [];

class App extends React.Component {
  getData = (value) => {
    console.log(value);
    data = value;
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div style={{ textAlign: "center" }}>
            <Route path="/" exact>
              <Header />
              <FileSection
                sendData={this.getData}
                style={{ marginBottom: "15%" }}
              />
            </Route>
            <Route
            path="/diagram"
            exact
            render={(props) =>
              data.length === 0 ? (
                <Redirect to="/" />
              ) : (
                <VennDiagram {...props} data={data} />
              )
            }
          />
          </div>
          
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
