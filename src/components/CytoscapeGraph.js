import React from 'react';
import { FileStore } from "../stores/FileStore";
import { Link } from "react-router-dom";
import img11_1 from '../data/graphs/img11_1.png';
import img11_2 from '../data/graphs/img11_2.png';
import img12_1 from '../data/graphs/img12_1.png';
import img12_2 from '../data/graphs/img12_2.png';
import img13_1 from '../data/graphs/img13_1.png';
import img13_2 from '../data/graphs/img13_2.png';
import img29_1 from '../data/graphs/img29_1.png';
import img29_2 from '../data/graphs/img29_2.png';
import img210_1 from '../data/graphs/img210_1.png';
import img210_2 from '../data/graphs/img210_2.png';
import img211_1 from '../data/graphs/img211_1.png';
import img211_2 from '../data/graphs/img211_2.png';
import img35_1 from '../data/graphs/img35_1.png';
import img35_2 from '../data/graphs/img35_2.png';
import img36_1 from '../data/graphs/img36_1.png';
import img36_2 from '../data/graphs/img36_2.png';
import img37_1 from '../data/graphs/img37_1.png';
import img37_2 from '../data/graphs/img37_2.png';
import img413_1 from '../data/graphs/img413_1.png';
import img413_2 from '../data/graphs/img413_2.png';
import img414_1 from '../data/graphs/img414_1.png';
import img414_2 from '../data/graphs/img414_2.png';
import img415_1 from '../data/graphs/img415_1.png';
import img415_2 from '../data/graphs/img415_2.png';


const CytoscapeGraph = () => {

    const imgSetNumber = FileStore.useState((s) => s.imgSetNumber);
    const fieldNumber = FileStore.useState((s) => s.fieldNumber);

    const [img1, setImg1] = React.useState(null);
    const [img2, setImg2] = React.useState(null);

    const files1 = ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE120934"];
    const files2 = ["SARS_GSE56192", "MERS_GSE56192", "SARS_COV2_GSE120934"];
    const files3 = ["SARS_GSE56192", "MERS_GSE139516", "SARS_COV2_GSE147507"];
    const files4 = ["SARS_GSE56192", "MERS_GSE56192", "SARS_COV2_GSE147507"];

    React.useEffect(() => {
        if (imgSetNumber === 1) {

            if (fieldNumber === 1) {
                setImg1(img11_1)
                setImg2(img11_2)
            } else if (fieldNumber === 2) {
                setImg1(img12_1)
                setImg2(img12_2)
            } else if (fieldNumber === 3) {
                setImg1(img13_1)
                setImg2(img13_2)
            }
        } else if (imgSetNumber === 2) {
            if (fieldNumber === 9) {
                setImg1(img29_1)
                setImg2(img29_2)
            } else if (fieldNumber === 10) {
                setImg1(img210_1)
                setImg2(img210_2)
                
            } else if (fieldNumber === 11) { 
                setImg1(img211_1)
                setImg2(img211_2)
                
            }

        } else if (imgSetNumber === 3) {
            if (fieldNumber === 5) {
                setImg1(img35_1)
                setImg2(img35_2)
                
            } else if (fieldNumber === 6) {
                setImg1(img36_1)
                setImg2(img36_2)
               
            } else if (fieldNumber === 7) { 
                setImg1(img37_1)
                setImg2(img37_2)
            }
            
        } else if (imgSetNumber === 4) {
            if (fieldNumber === 13) {
                setImg1(img413_1)
                setImg2(img413_2)
            } else if (fieldNumber === 14) {
                setImg1(img414_1)
                setImg2(img414_2)
                
            } else if (fieldNumber === 15) { 
                setImg1(img415_1)
                setImg2(img415_2)
            }
        }
    }, []);

    return (
        <div className="flex" style={{marginTop: "7%"}}>
            <img src={img1} width="40%" />
            <img src={img2} width="40%" style={{marginLeft: "5%"}} />
        </div>
    );
};

export default CytoscapeGraph;