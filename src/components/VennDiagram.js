import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VennModule from "highcharts/modules/venn.js";
VennModule(Highcharts);

class VennDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const options = {
      title: {
        text: "My chart",
        type: "venn"
      },
      series: [{
        type: 'venn',
        data: [{
            name: 'Aaa',
            sets: ['A', 'B'],
            value: 2
        }, {
            name: 'Bbb',
            sets: ['B'],
            value: 2
        }]
    }]
    };
    return (
      <div className="venn-diagram">
        <h4>Venn Diagram page will reside here</h4>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default VennDiagram;
