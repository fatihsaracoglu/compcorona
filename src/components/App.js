import React from "react";
import Header from "./Header";
import FileSection from "./FileSection";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import VennDiagram from "./VennDiagram";
import VennDiagram1 from "./VennDiagram1";

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
            <Route path="/diagram" exact>
              <Header />
              <FileSection
                sendData={this.getData}
                style={{ marginBottom: "15%" }}
              />
            </Route>
            <Route
            path="/"
            exact
            render={(props) =>
              data.length === 0 ? (
                <VennDiagram1 {...props} data={data} />
              ) : (
                <Redirect to="/" />
                
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
