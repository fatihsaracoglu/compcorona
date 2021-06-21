import React from 'react';
import { FileStore } from "../stores/FileStore";
import { Link } from "react-router-dom";

import Cytoscape from 'cytoscape';
import CytoscapeComponent, { normalizeElements } from 'react-cytoscapejs';



class CytoscapeGraph extends React.Component {

    render() {

        const layout = { name: 'random', nodeSpacing: 40 };
        const elements = CytoscapeComponent.normalizeElements({
            nodes: [
              { data: { id: 'one', label: 'Gene 1'}},
              { data: { id: 'two', label: 'Gene 2'}},
              { data: { id: 'three', label: 'Gene 3'}},
              { data: { id: 'four', label: 'Gene 4'}},
              { data: { id: 'five', label: 'Gene 5'}},
            ],
            edges: [
              {
                data: {source: 'one', target: 'two', label: 'Edge from Node1 to Node2' },
                data: { source: 'one', target: 'three', label: 'Edge from Node1 to Node2' },
                data: { source: 'one', target: 'four', label: 'Edge from Node1 to Node3' },
                data: { source: 'two', target: 'five', label: 'Edge from Node1 to Node4' },
                data: { source: 'two', target: 'four', label: 'Edge from Node1 to Node5' },
                data: { source: 'one', target: 'three', label: 'Edge from Node1 to Node2' },
                data: { source: 'three', target: 'four', label: 'Edge from Node1 to Node2' },
                data: { source: 'five', target: 'three', label: 'Edge from Node1 to Node2' },
              }
            ]
          });

        return (
            <div style={{width: '100%'}}>
                <h1 style={{marginTop: '2%'}}>Gene Interaction Graph</h1>
                <CytoscapeComponent layout={layout} elements={elements} style={ { width: window.innerWidth, height: window.innerHeight - 200, textAlign: 'start', margin: '10%'} } zoomingEnabled={false}/>
            </div>
        );
    }
};

export default CytoscapeGraph;