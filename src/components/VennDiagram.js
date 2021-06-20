import React from "react";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";
import { Modal, ListGroup, Button, Tabs, Tab } from "react-bootstrap";
import { FileStore } from "../stores/FileStore";
import { withTranslation } from "react-i18next";
import { ExportToCsv } from "export-to-csv";
import { Link } from "react-router-dom";
import "../assets/VennDiagram.css";

/* eslint-disable */

const VennDiagram1 = (props) => {
  const sets = FileStore.useState((s) => s.sets);
  const geneObjectList = FileStore.useState((s) => s.geneObjectList);
  const isGeneListModalOpen = FileStore.useState((s) => s.isGeneListModalOpen);
  const isGeneListModalOpen2 = FileStore.useState(
    (s) => s.isGeneListModalOpen2
  );
  const geneList = FileStore.useState((s) => s.geneList);
  const loadedGeneCount = FileStore.useState((s) => s.loadedGeneCount);
  const initialGeneList = FileStore.useState((s) => s.initialGeneList);
  const geneListWithoutIntersections = FileStore.useState(
    (s) => s.geneListWithoutIntersections
  );
  const initialGeneList2 = FileStore.useState((s) => s.initialGeneList2);
  const loadedGeneCount2 = FileStore.useState((s) => s.loadedGeneCount2);
  const currentRegionGeneCount = FileStore.useState(
    (s) => s.currentRegionGeneCount
  );
  const isGeneListWebsiteOptionModal = FileStore.useState(
    (s) => s.isGeneListWebsiteOptionModal
  );
  const isGeneListWebsiteOptionModal2 = FileStore.useState(
    (s) => s.isGeneListWebsiteOptionModal2
  );
  const modalNumber = FileStore.useState((s) => s.modalNumber);
  const clickedRegionObject = FileStore.useState((s) => s.clickedRegionObject);
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const imgSetNumber = FileStore.useState((s) => s.imgSetNumber);
  

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  const areEqual = (first, second) => {
    if (first.length !== second.length){
       return false;
    };
    for (let i = 0; i < first.length; i++){
       if (!second.includes(first[i])){
          return false;
       };
    };
    return true;
 };

  React.useEffect(() => {
    const div = d3.select(".venn-diagram");
    div.datum(sets).call(venn.VennDiagram().width(600).height(600));
    FileStore.update((s) => {
      s.generateVennDiagram = false;
    });

    d3.selectAll("path").style("fill", "#6495ED");
    d3.selectAll("text").style("fill", "#696969");

    // add listeners to all the groups to display tooltip on mouseover
    div
      .selectAll("g")
      .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // highlight the current path
        d3.select(this)
          .transition()
          .duration(400)
          .select("path")
          .style("stroke-width", 10)
          .style("stroke", "#696969")
          .style("fill-opacity", d.sets.length === 1 ? 0.7 : 0.3)
          .style("stroke-opacity", 1);
      })
      .on("mouseout", function (d, i) {
        // un-highlight the current path
        d3.select(this)
          .transition()
          .duration(400)
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", d.sets.length === 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      })
      .on("click", (d, i) => {
        //returns associated region's object {content:["", "",..], label:[""]}
        let region_obj = geneObjectList.find((obj) =>
          arraysEqual(obj.label, d.sets)
        );

        console.log(d)
        if (areEqual(d["sets"], ["SARS_GSE56192", "MERS_GSE139516"])) {
          FileStore.update((s) => {
            s.fieldNumber = 1;
          });
        } else if (areEqual(d["sets"], ["SARS_GSE56192", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 2;
          });
        } else if (areEqual(d["sets"], ["MERS_GSE139516", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 3;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 4;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "MERS_GSE139516"])) {
          FileStore.update((s) => {
            s.fieldNumber = 5;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 6;
          });
        } else if (areEqual(d["sets"],  ["MERS_GSE139516", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 7;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 8;
          });
        } else if (areEqual(d["sets"], ["SARS_GSE56192", "MERS_GSE56192"])) {
          FileStore.update((s) => {
            s.fieldNumber = 9;
          });
        } else if (areEqual(d["sets"], ["SARS_GSE56192", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 10;
          });
        } else if (areEqual(d["sets"], ["MERS_GSE56192", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 11;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "MERS_GSE56192", "SARS_COV2_GSE120934"])) {
          FileStore.update((s) => {
            s.fieldNumber = 12;
          });
        } else if (areEqual(d["sets"], ["SARS_GSE56192", "MERS_GSE139516"])) {
          FileStore.update((s) => {
            s.fieldNumber = 13;
          });
        } else if (areEqual(d["sets"], ["SARS_GSE56192", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 14;
          });
        } else if (areEqual(d["sets"], ["MERS_GSE139516", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 15;
          });
        } else if (areEqual(d["sets"],  ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE147507"])) {
          FileStore.update((s) => {
            s.fieldNumber = 16;
          });
        }

        
       
        

        FileStore.update((s) => {
          s.clickedRegionObject = region_obj;
        });

        FileStore.update((s) => {
          s.currentRegionGeneCount = region_obj.content.length;
        });

        var intersection_objects = [];
        if (d.sets.length === 1) {
          geneObjectList.forEach((x) => {
            if (x.label.length === 2 && x.label.includes(region_obj.label[0]))
              intersection_objects.push(x);
          });

          FileStore.update((s) => {
            s.geneListWithoutIntersections = region_obj.differenceGenes;
          });
        }

        FileStore.update((s) => {
          s.geneList = region_obj.content;
        });

        if (region_obj.content.length >= 10) {
          FileStore.update((s) => {
            s.initialGeneList = region_obj.content.slice(0, 10);
            s.loadedGeneCount = 10;
          });
        } else {
          FileStore.update((s) => {
            s.initialGeneList = region_obj.content;
            s.loadedGeneCount = region_obj.content.length;
          });
        }

        if (d.sets.length === 1) {
          if (region_obj.differenceGenes.length >= 10) {
            FileStore.update((s) => {
              s.initialGeneList2 = region_obj.differenceGenes.slice(0, 10);
              s.loadedGeneCount2 = 10;
            });
          } else {
            FileStore.update((s) => {
              s.initialGeneList2 = region_obj.differenceGenes;
              s.loadedGeneCount2 = region_obj.differenceGenes.length;
            });
          }
          if (intersection_objects.length === 0) {
            toggleOptionModal(1);
            //toggleGeneModal();
          } else {
            toggleOptionModal(2);
            //toggleGeneModal2();
          }
        }
        //console.log(obj.content);
        if (d.sets.length !== 1) {
          toggleOptionModal2(1);
          //toggleGeneModal();
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  const toggleGeneModal = () => {
    FileStore.update((s) => {
      s.isGeneListModalOpen = !isGeneListModalOpen;
    });
  };

  const toggleGeneModal2 = () => {
    FileStore.update((s) => {
      s.isGeneListModalOpen2 = !isGeneListModalOpen2;
    });
  };

  const handleLoadMore = () => {
    if (geneList.length - loadedGeneCount < 10) {
      FileStore.update((s) => {
        s.initialGeneList = geneList.slice(loadedGeneCount, geneList.length);
        s.loadedGeneCount = geneList.length;
      });
    } else {
      FileStore.update((s) => {
        s.initialGeneList = geneList.slice(
          loadedGeneCount,
          loadedGeneCount + 10
        );
        s.loadedGeneCount = loadedGeneCount + 10;
      });
    }
  };

  const handleLoadMore2 = () => {
    if (geneListWithoutIntersections.length - loadedGeneCount2 < 10) {
      FileStore.update((s) => {
        s.initialGeneList2 = geneListWithoutIntersections.slice(
          loadedGeneCount2,
          geneListWithoutIntersections.length
        );
        s.loadedGeneCount2 = geneListWithoutIntersections.length;
      });
    } else {
      FileStore.update((s) => {
        s.initialGeneList2 = geneListWithoutIntersections.slice(
          loadedGeneCount2,
          loadedGeneCount2 + 10
        );
        s.loadedGeneCount2 = loadedGeneCount2 + 10;
      });
    }
  };

  const toggleOptionModal = (num) => {
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal = !isGeneListWebsiteOptionModal;
      s.modalNumber = num;
    });
  };

  const toggleOptionModal2 = (num) => {
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal2 = !isGeneListWebsiteOptionModal2;
      s.modalNumber = num;
    });
  };

  const handleGeneListPress = () => {
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal = false;
      s.isGeneListWebsiteOptionModal2 = false;
    });
    if (modalNumber === 1) {
      toggleGeneModal();
    } else if (modalNumber === 2) {
      toggleGeneModal2();
    }
  };

  const handleNCBIPress = () => {
    var genes = "";
    for (var i = 0; i < geneList.length; i++) {
      if (i === geneList.length - 1) {
        genes += geneList[i] + "[GN]";
        break;
      }
      genes += geneList[i] + "[GN]+OR+";
    }
    const url =
      "https://www.ncbi.nlm.nih.gov/gene/?term=(" +
      genes +
      ')+AND+"Homo+sapiens"[porgn:__txid9606]';
    window.open(url, "_blank");
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal = false;
      s.isGeneListWebsiteOptionModal2 = false;
    });
  };

  const handleNCBIPathwayPress = () => {
    var genes = "";
    for (var i = 0; i < geneList.length; i++) {
      if (i === geneList.length - 1) {
        genes += geneList[i] + "[GN]";
        break;
      }
      genes += geneList[i] + "[GN]+OR+";
    }
    const url =
      "https://www.ncbi.nlm.nih.gov/biosystems/?term=(" +
      genes +
      ')+AND+"Homo+sapiens"[Organism]';
    window.open(url, "_blank");
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal = false;
      s.isGeneListWebsiteOptionModal2 = false;
    });
  };

  const handleDownloadGeneList = () => {
    FileStore.update((s) => {
      s.isGeneListWebsiteOptionModal2 = !isGeneListWebsiteOptionModal2;
    });

    const csvData = [];

    if (clickedRegionObject.label.length === 2) {
      for (var i = 0; i < clickedRegionObject.content.length; i++) {
        var row = {};
        row.gene_name = clickedRegionObject.content[i];
        row["pval_" + clickedRegionObject.label[0]] =
          clickedRegionObject.pval_1[i];
        row["pval_" + clickedRegionObject.label[1]] =
          clickedRegionObject.pval_2[i];
        row["fc_" + clickedRegionObject.label[0]] = clickedRegionObject.fc_1[i];
        row["fc_" + clickedRegionObject.label[1]] = clickedRegionObject.fc_2[i];
        row["de_" + clickedRegionObject.label[0]] = clickedRegionObject.de_1[i];
        row["de_" + clickedRegionObject.label[1]] = clickedRegionObject.de_2[i];
        csvData.push(row);
      }
    } else if (clickedRegionObject.label.length === 3) {
      for (var i = 0; i < clickedRegionObject.content.length; i++) {
        var row = {};
        row.gene_name = clickedRegionObject.content[i];
        row["pval_" + clickedRegionObject.label[0]] =
          clickedRegionObject.pval_1[i];
        row["pval_" + clickedRegionObject.label[1]] =
          clickedRegionObject.pval_2[i];
        row["pval_" + clickedRegionObject.label[2]] =
          clickedRegionObject.pval_3[i];
        row["fc_" + clickedRegionObject.label[0]] = clickedRegionObject.fc_1[i];
        row["fc_" + clickedRegionObject.label[1]] = clickedRegionObject.fc_2[i];
        row["fc_" + clickedRegionObject.label[2]] = clickedRegionObject.fc_3[i];
        row["de_" + clickedRegionObject.label[0]] = clickedRegionObject.de_1[i];
        row["de_" + clickedRegionObject.label[1]] = clickedRegionObject.de_2[i];
        row["de_" + clickedRegionObject.label[2]] = clickedRegionObject.de_3[i];
        csvData.push(row);
      }
    }
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      filename: "gene-list",
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csvData);
  };

  const handleDownloadCytoscape = () => {

    const file_names = []
    nonFilteredFiles.forEach(element => {
      file_names.push(element["name"])
    });

    const files1 = ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE120934"];
    const files2 = ["SARS_GSE56192", "MERS_GSE56192", "SARS_COV2_GSE120934"];
    const files3 = ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE147507"];
    const files4 = ["SARS_GSE56192", "MERS_GSE56192", "SARS_COV2_GSE147507"];

    if (areEqual(file_names, files1)) {
      FileStore.update((s) => {
        s.imgSetNumber = 1;
      });
    } else if (areEqual(file_names, files2)) {
      FileStore.update((s) => {
        s.imgSetNumber = 2;
      });
    } else if (areEqual(file_names, files3)) {
      FileStore.update((s) => {
        s.imgSetNumber = 3;
      });
    } else if (areEqual(file_names, files4)) {
      FileStore.update((s) => {
        s.imgSetNumber = 4;
      });
    } else {
      FileStore.update((s) => {
        s.imgSetNumber = 5;
      });
    }
    console.log(imgSetNumber)
    console.log("hey")
  }

  return (
    <div
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div className="venn-diagram"></div>
      <Modal show={isGeneListModalOpen} onHide={toggleGeneModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", fontSize: "17px" }}>
              {props.t("gene.list.title")}
              {currentRegionGeneCount}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <ListGroup>
            {initialGeneList.length === 0 ? (
              <div style={{ margin: "5% 0 5% 0" }}>
                {props.t("gene.list.empty")}
              </div>
            ) : (
              initialGeneList.map((gene, idx) => {
                var url =
                  "https://www.ncbi.nlm.nih.gov/gene/?term=(" +
                  gene +
                  '[GN])+AND+"Homo+sapiens"[porgn:__txid9606]';
                return (
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    target="_blank"
                    href={url}
                    key={idx}
                  >
                    <ListGroup.Item key={idx}>{gene}</ListGroup.Item>
                  </a>
                );
              })
            )}
          </ListGroup>
          {initialGeneList.length === 0 ||
          loadedGeneCount === geneList.length ? null : (
            <Button
              className="shadow-none"
              variant="outline-primary"
              size="sm"
              disabled={Object.keys(geneList).length === 0}
              onClick={handleLoadMore}
              style={{ marginTop: "4%" }}
            >
              {props.t("gene.list.load.more")}
            </Button>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={isGeneListModalOpen2} onHide={toggleGeneModal2}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", fontSize: "17px" }}>
              {props.t("gene.list.title")}
              {currentRegionGeneCount}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <Tabs defaultActiveKey="1" id="uncontrolled-tab">
            <Tab eventKey="1" title={props.t("gene.list.without.intersection")}>
              <ListGroup>
                {initialGeneList2.length === 0 ? (
                  <div style={{ margin: "5% 0 5% 0" }}>
                    {props.t("gene.list.empty")}
                  </div>
                ) : (
                  initialGeneList2.map((gene, idx) => {
                    var url =
                      "https://www.ncbi.nlm.nih.gov/gene/?term=(" +
                      gene +
                      '[GN])+AND+"Homo+sapiens"[porgn:__txid9606]';
                    return (
                      <a
                        style={{ textDecoration: "none", color: "inherit" }}
                        target="_blank"
                        href={url}
                        key={idx}
                      >
                        <ListGroup.Item key={idx}>{gene}</ListGroup.Item>
                      </a>
                    );
                  })
                )}
              </ListGroup>
              {initialGeneList2.length === 0 ||
              loadedGeneCount2 ===
                geneListWithoutIntersections.length ? null : (
                <Button
                  className="shadow-none"
                  variant="outline-primary"
                  size="sm"
                  disabled={
                    Object.keys(geneListWithoutIntersections).length === 0
                  }
                  onClick={handleLoadMore2}
                  style={{ marginTop: "4%" }}
                >
                  {props.t("gene.list.load.more")}
                </Button>
              )}
            </Tab>
            <Tab eventKey="2" title={props.t("gene.list.with.intersection")}>
              <ListGroup>
                {initialGeneList.length === 0 ? (
                  <div style={{ margin: "5% 0 5% 0" }}>
                    {props.t("gene.list.empty")}
                  </div>
                ) : (
                  initialGeneList.map((gene, idx) => {
                    var url =
                      "https://www.ncbi.nlm.nih.gov/gene/?term=(" +
                      gene +
                      '[GN])+AND+"Homo+sapiens"[porgn:__txid9606]';
                    return (
                      <a
                        style={{ textDecoration: "none", color: "inherit" }}
                        target="_blank"
                        href={url}
                        key={idx}
                      >
                        <ListGroup.Item key={idx}>{gene}</ListGroup.Item>
                      </a>
                    );
                  })
                )}
              </ListGroup>
              {initialGeneList.length === 0 ||
              loadedGeneCount === geneList.length ? null : (
                <Button
                  className="shadow-none"
                  variant="outline-primary"
                  size="sm"
                  disabled={Object.keys(geneList).length === 0}
                  onClick={handleLoadMore}
                  style={{ marginTop: "4%" }}
                >
                  {props.t("gene.list.load.more")}
                </Button>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      <Modal show={isGeneListWebsiteOptionModal} onHide={toggleOptionModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", fontSize: "17px" }}>
              {props.t("option.list.title")}
              {currentRegionGeneCount}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <div className="justify-content-center">
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleGeneListPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("show.gene.list")}
              </Button>
            </div>
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleNCBIPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("go.ncbi.genes")}
              </Button>
            </div>
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleNCBIPathwayPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("go.ncbi.pathway")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={isGeneListWebsiteOptionModal2} onHide={toggleOptionModal2}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", fontSize: "17px" }}>
              {props.t("option.list.title")}
              {currentRegionGeneCount}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <div className="justify-content-center">
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleGeneListPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("show.gene.list")}
              </Button>
            </div>
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleDownloadGeneList}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("download.gene.list")}
              </Button>
            </div>
            <div>
            <Link to={`${process.env.PUBLIC_URL}/cytoscape`}>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleDownloadCytoscape}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("download.cytoscape.graph")}
              </Button>
              </Link>
            </div>
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleNCBIPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("go.ncbi.genes")}
              </Button>
            </div>
            <div>
              <Button
                className="shadow-none"
                variant="primary"
                size="sm"
                onClick={handleNCBIPathwayPress}
                style={{width: "65%", marginBottom: "3%"}}
              >
                {props.t("go.ncbi.pathway")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation()(VennDiagram1);
