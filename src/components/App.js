import React, { Suspense } from "react";
import Header from "./Header";
import FileSection from "./FileSection";
import Footer from "./Footer";
import { BrowserRouter, Route } from "react-router-dom";
import DiagramPage from "./DiagramPage";
import "../i18n";
import "../assets/App.css";
import SelectPreprocessedData from "./SelectPreprocessedData";
import { FileStore } from "../stores/FileStore";
import CytoscapeGraph from "./CytoscapeGraph";
import PCAButton from "./PCAButton";
import PCAGraph from "./PCAGraph";
import { Link } from "react-router-dom";

const App = () => {

  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const filteredFiles = FileStore.useState((s) => s.filteredFiles);

  return (
    <div>
      <Suspense fallback={null}>
        <BrowserRouter>
          <div style={{ textAlign: "center" }}>
            <Route path={`${process.env.PUBLIC_URL}/`} exact>
              <div className="main">
              <Header />
              <FileSection style={{ marginBottom: "15%" }} />
              {nonFilteredFiles.length !== 0 || filteredFiles.length !== 0 ? null : (
              <div style={{ marginTop: "3%", display: "flex", justifyContent: "center"}}>
                <div style={{marginRight: "1%"}}>
                <SelectPreprocessedData />
                </div>
                <Link to={`${process.env.PUBLIC_URL}/pca`}>
                  <PCAButton />
                </Link>
              </div>)}
              </div>
              
              <Footer />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/diagram`} exact>
              <DiagramPage />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/cytoscape`} exact>
              <CytoscapeGraph />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/pca`} exact>
              <PCAGraph />
            </Route>
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
