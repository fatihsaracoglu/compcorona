import React from "react";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";
import { Button, Modal } from "react-bootstrap";

class VennDiagram1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      text: "",
      sets: [
        { sets: ["A"], size: 100, label: "L1" },
        { sets: ["B"], size: 100, label: "L2" },
        { sets: ["C"], size: 100, label: "L3" },
        { sets: ["A", "B"], size: 10 },
        { sets: ["B", "C"], size: 10 },
        { sets: ["A", "C"], size: 10 },
        { sets: ["A", "B", "C"], size: 5 },
      ],
    };
  }

  handleClose = () => this.setState({ show: false });
  handleOpen = () => this.setState({ show: true });

  componentDidMount() {
    const div = d3.select(".venn-diagram");
    div.datum(this.state.sets).call(venn.VennDiagram().width(600)
    .height(600));
    // add a tooltip
    var tooltip = d3.select("body").append("div").attr("class", "venntooltip");
    // add listeners to all the groups to display tooltip on mouseover
    div
      .selectAll("g")
      .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // // Display a tooltip with the current size
        // tooltip.transition().duration(400).style("opacity", 0.9);
        // tooltip.text(d.size + " users");

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection
          .select("path")
          .style("stroke-width", 3)
          .style("fill-opacity", d.sets.length === 1 ? 0.7 : 0.3)
          .style("stroke-opacity", 1);
      })

      .on("mousemove", function () {
        // tooltip
        //   .style("left", d3.event.pageX + "px")
        //   .style("top", d3.event.pageY - 28 + "px");
      })

      .on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", d.sets.length === 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      })
      .on("click", (d, i) => {
        this.setState({ show: true, text: d.sets });
      });
  }

  render() {
    return (
      <div>
        <div className="venn-diagram"></div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.text}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default VennDiagram1;
