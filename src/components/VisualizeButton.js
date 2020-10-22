import React from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

/* eslint-disable */

const VisualizeButton = (props) => {
  const isFiltered = FileStore.useState((s) => s.isFiltered);
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const filteredFiles = FileStore.useState((s) => s.filteredFiles);
  const geneObjectList = FileStore.useState((s) => s.geneObjectList);

  const handleVisualize = () => {
    FileStore.update((s) => {
      s.generateVennDiagram = true;
    });
  };

  const handleVennContent = () => {
    FileStore.update((s) => {
      s.sets = [];
    });
    var single_obj_list = [];
    var obj_list = [];
    var files = isFiltered ? filteredFiles : nonFilteredFiles;
    files.forEach((file) => {
      var file_set = [];
      var pvalue_list = [];
      var fc_list = [];
      var de_list = [];
      file.content.forEach((row) => {
        file_set.push(row.gene_name);
        pvalue_list.push(row.pval);
        fc_list.push(row.fc);
        de_list.push(row.de);
      });
      // for object list to show genes when clicked
      var single_obj = {};
      single_obj.label = [file.name];
      single_obj.content = file_set;
      single_obj.pvalue = pvalue_list;
      single_obj.foldchange = fc_list;
      single_obj.de = de_list;
      single_obj_list.push(single_obj);

      var set_obj = {};
      set_obj.label = file.name;
      set_obj.content = file_set;
      set_obj.pvalue = pvalue_list;
      set_obj.foldchange = fc_list;
      set_obj.de = de_list;
      obj_list.push(set_obj);
    });

    var totalList = [];

    var obj_list_for_intersections = [];
    var count = 0;
    // If there are 3 files uploaded
    if (obj_list.length === 3) {
      var i = 0;
      var j = 0;

      // intersection of triple
      gene_set = {};
      gene_set.sets = [
        obj_list[0].label,
        obj_list[1].label,
        obj_list[2].label,
      ];
      gene_set.size = 10;
      intersection_obj = {};
      intersection_obj.label = [
        obj_list[0].label,
        obj_list[1].label,
        obj_list[2].label,
      ];
      var common_bw_two = obj_list[0].content.filter((value) =>
        obj_list[1].content.includes(value)
      );
      intersection_obj.content = common_bw_two.filter((value) =>
        obj_list[2].content.includes(value)
      );

      gene_set.label = "" + intersection_obj.content.length;

      // for hashing gene-name and pvalue
      var result_triple = {};
      var fc_result_triple = {};
      var de_result_triple = {};
      obj_list[0].content.forEach((key, idx) => {
        result_triple[key] = obj_list[0].pvalue[idx];
        fc_result_triple[key] = obj_list[0].foldchange[idx];
        de_result_triple[key] = obj_list[0].de[idx];
      });
      var associated_pvalues = [];
      var associated_fc = [];
      var associated_de = [];
      intersection_obj.content.forEach((gene) => {
        associated_pvalues.push(result_triple[gene]);
        associated_fc.push(fc_result_triple[gene]);
        associated_de.push(de_result_triple[gene]);
      });
      intersection_obj["pval_1"] = associated_pvalues;
      intersection_obj["fc_1"] = associated_fc;
      intersection_obj["de_1"] = associated_de;

      // for hashing gene-name and pvalue
      result_triple = {};
      fc_result_triple = {};
      de_result_triple = {};
      obj_list[1].content.forEach((key, idx) => {
        result_triple[key] = obj_list[1].pvalue[idx];
        fc_result_triple[key] = obj_list[1].foldchange[idx];
        de_result_triple[key] = obj_list[1].de[idx];
      });
      associated_pvalues = [];
      associated_fc = [];
      associated_de = [];
      intersection_obj.content.forEach((gene) => {
        associated_pvalues.push(result_triple[gene]);
        associated_fc.push(fc_result_triple[gene]);
        associated_de.push(de_result_triple[gene]);
      });
      intersection_obj["pval_2"] = associated_pvalues;
      intersection_obj["fc_2"] = associated_fc;
      intersection_obj["de_2"] = associated_de;

      // for hashing gene-name and pvalue
      result_triple = {};
      fc_result_triple = {};
      de_result_triple = {};
      obj_list[2].content.forEach((key, idx) => {
        result_triple[key] = obj_list[2].pvalue[idx];
        fc_result_triple[key] = obj_list[2].foldchange[idx];
        de_result_triple[key] = obj_list[2].de[idx];
      });
      associated_pvalues = [];
      associated_fc = [];
      associated_de = [];
      intersection_obj.content.forEach((gene) => {
        associated_pvalues.push(result_triple[gene]);
        associated_fc.push(fc_result_triple[gene]);
        associated_de.push(de_result_triple[gene]);
      });
      intersection_obj["pval_3"] = associated_pvalues;
      intersection_obj["fc_3"] = associated_fc;
      intersection_obj["de_3"] = associated_de;

      if (intersection_obj.content.length !== 0) {
        obj_list_for_intersections.push(intersection_obj);
        FileStore.update((s) => {
          s.sets.push(gene_set);
        });
      }

      // Double Intersections - 1
      gene_set = {};
      gene_set.sets = [obj_list[0].label, obj_list[1].label];
      gene_set.size = 10;
      var intersection_obj1 = {};
      intersection_obj1.label = [obj_list[0].label, obj_list[1].label];
      intersection_obj1.content = obj_list[0].content.filter((value) =>
        obj_list[1].content.includes(value)
      );

      gene_set.label = "" + (intersection_obj1.content.length - intersection_obj.content.length);


      // for hashing gene-name and pvalue
      var result = {};
      var fc_result = {};
      var de_result = {};
      obj_list[0].content.forEach((key, idx) => {
        result[key] = obj_list[0].pvalue[idx];
        fc_result[key] = obj_list[0].foldchange[idx];
        de_result[key] = obj_list[0].de[idx];
      });
      var associated_pvalues = [];
      var associated_fc = [];
      var associated_de = [];
      intersection_obj1.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj1["pval_1"] = associated_pvalues;
      intersection_obj1["fc_1"] = associated_fc;
      intersection_obj1["de_1"] = associated_de;

      // for hashing gene-name and pvalue
      result = {};
      fc_result = {};
      de_result = {};
      obj_list[1].content.forEach((key, idx) => {
        result[key] = obj_list[1].pvalue[idx];
        fc_result[key] = obj_list[1].foldchange[idx];
        de_result[key] = obj_list[1].de[idx];
      });
      associated_pvalues = [];
      associated_fc = [];
      associated_de = [];
      intersection_obj1.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj1["pval_2"] = associated_pvalues;
      intersection_obj1["fc_2"] = associated_fc;
      intersection_obj1["de_2"] = associated_de;

      if (intersection_obj1.content.length !== 0) {
        obj_list_for_intersections.push(intersection_obj1);
        FileStore.update((s) => {
          s.sets.push(gene_set);
        });
      }


      // Double Intersection - 2
      gene_set = {}
      gene_set.sets = [obj_list[1].label, obj_list[2].label];
      gene_set.size = 10;
      var intersection_obj2 = {};
      intersection_obj2.label = [obj_list[1].label, obj_list[2].label];
      intersection_obj2.content = obj_list[1].content.filter((value) =>
        obj_list[2].content.includes(value)
      );

      gene_set.label = "" + (intersection_obj2.content.length - intersection_obj.content.length);

      // for hashing gene-name and pvalue
      var result = {};
      var fc_result = {};
      var de_result = {};
      obj_list[1].content.forEach((key, idx) => {
        result[key] = obj_list[1].pvalue[idx];
        fc_result[key] = obj_list[1].foldchange[idx];
        de_result[key] = obj_list[1].de[idx];
      });
      var associated_pvalues = [];
      var associated_fc = [];
      var associated_de = [];
      intersection_obj2.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj2["pval_1"] = associated_pvalues;
      intersection_obj2["fc_1"] = associated_fc;
      intersection_obj2["de_1"] = associated_de;

      // for hashing gene-name and pvalue
      var result2 = {};
      var fc_result2 = {};
      var de_result2 = {};
      obj_list[2].content.forEach((key, idx) => {
        result2[key] = obj_list[2].pvalue[idx];
        fc_result2[key] = obj_list[2].foldchange[idx];
        de_result2[key] = obj_list[2].de[idx];
      });
      var associated_pvalues2 = [];
      var associated_fc2 = [];
      var associated_de2 = [];
      intersection_obj2.content.forEach((gene) => {
        associated_pvalues2.push(result2[gene]);
        associated_fc2.push(fc_result2[gene]);
        associated_de2.push(de_result2[gene]);
      });
      intersection_obj2["pval_2"] = associated_pvalues2;
      intersection_obj2["fc_2"] = associated_fc2;
      intersection_obj2["de_2"] = associated_de2;

      if (intersection_obj2.content.length !== 0) {
        obj_list_for_intersections.push(intersection_obj2);
        FileStore.update((s) => {
          s.sets.push(gene_set);
        });
      }


      // Double Intersection - 3
      gene_set = {}
      gene_set.sets = [obj_list[0].label, obj_list[2].label];
      gene_set.size = 10;
      var intersection_obj3 = {};
      intersection_obj3.label = [obj_list[0].label, obj_list[2].label];
      intersection_obj3.content = obj_list[0].content.filter((value) =>
        obj_list[2].content.includes(value)
      );

      gene_set.label = "" + (intersection_obj3.content.length - intersection_obj.content.length);

      // for hashing gene-name and pvalue
      var result = {};
      var fc_result = {};
      var de_result = {};
      obj_list[0].content.forEach((key, idx) => {
        result[key] = obj_list[1].pvalue[idx];
        fc_result[key] = obj_list[1].foldchange[idx];
        de_result[key] = obj_list[1].de[idx];
      });
      var associated_pvalues = [];
      var associated_fc = [];
      var associated_de = [];
      intersection_obj3.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj3["pval_1"] = associated_pvalues;
      intersection_obj3["fc_1"] = associated_fc;
      intersection_obj3["de_1"] = associated_de;

      // for hashing gene-name and pvalue
      var result2 = {};
      var fc_result2 = {};
      var de_result2 = {};
      obj_list[2].content.forEach((key, idx) => {
        result2[key] = obj_list[2].pvalue[idx];
        fc_result2[key] = obj_list[2].foldchange[idx];
        de_result2[key] = obj_list[2].de[idx];
      });
      var associated_pvalues2 = [];
      var associated_fc2 = [];
      var associated_de2 = [];
      intersection_obj3.content.forEach((gene) => {
        associated_pvalues2.push(result2[gene]);
        associated_fc2.push(fc_result2[gene]);
        associated_de2.push(de_result2[gene]);
      });
      intersection_obj3["pval_2"] = associated_pvalues2;
      intersection_obj3["fc_2"] = associated_fc2;
      intersection_obj3["de_2"] = associated_de2;

      if (intersection_obj3.content.length !== 0) {
        obj_list_for_intersections.push(intersection_obj3);
        FileStore.update((s) => {
          s.sets.push(gene_set);
        });
      }
    } else if (obj_list.length === 2) {
      var gene_set = {};
      gene_set.sets = [obj_list[0].label, obj_list[1].label];
      gene_set.size = 10;
      var intersection_obj = {};
      intersection_obj.label = [obj_list[0].label, obj_list[1].label];
      intersection_obj.content = obj_list[0].content.filter((value) =>
        obj_list[1].content.includes(value)
      );

      gene_set.label = "" + intersection_obj.content.length;

      // for hashing gene-name and pvalue
      var result = {};
      var fc_result = {};
      var de_result = {};
      obj_list[0].content.forEach((key, idx) => {
        result[key] = obj_list[0].pvalue[idx];
        fc_result[key] = obj_list[0].foldchange[idx];
        de_result[key] = obj_list[0].de[idx];
      });
      var associated_pvalues = [];
      var associated_fc = [];
      var associated_de = [];
      intersection_obj.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj["pval_1"] = associated_pvalues;
      intersection_obj["fc_1"] = associated_fc;
      intersection_obj["de_1"] = associated_de;

      // for hashing gene-name and pvalue
      result = {};
      fc_result = {};
      de_result = {};
      obj_list[1].content.forEach((key, idx) => {
        result[key] = obj_list[1].pvalue[idx];
        fc_result[key] = obj_list[1].foldchange[idx];
        de_result[key] = obj_list[1].de[idx];
      });
      associated_pvalues = [];
      associated_fc = [];
      associated_de = [];
      intersection_obj.content.forEach((gene) => {
        associated_pvalues.push(result[gene]);
        associated_fc.push(fc_result[gene]);
        associated_de.push(de_result[gene]);
      });
      intersection_obj["pval_2"] = associated_pvalues;
      intersection_obj["fc_2"] = associated_fc;
      intersection_obj["de_2"] = associated_de;

      if (intersection_obj.content.length !== 0) {
        obj_list_for_intersections.push(intersection_obj);
        FileStore.update((s) => {
          s.sets.push(gene_set);
        });
      }
    }

    Array.prototype.diff = function (a) {
      return this.filter(function (i) {
        return a.indexOf(i) < 0;
      });
    };

    single_obj_list.forEach((region_obj) => {
      var gene_set = {};
      var intersection_objects = [];
      var difference_genes = [];
      obj_list_for_intersections.forEach((obj) => {
        if (obj.label.length === 2 && obj.label.includes(region_obj.label[0])) {
          intersection_objects.push(obj);
        }
      });
      var content_of_intersection_objects = [];
      intersection_objects.forEach((o) => {
        content_of_intersection_objects.push(...o.content);
      });
      // To remove genes that are common in these two intersection regions
      var unique_content_of_intersection_objects = [
        ...new Set(content_of_intersection_objects),
      ];
      difference_genes = region_obj.content.diff(
        unique_content_of_intersection_objects
      );
      region_obj["differenceGenes"] = difference_genes;
      gene_set.sets = region_obj.label;
      gene_set.size = 100;
      gene_set.label =
        region_obj.label + " (" + difference_genes.length + " genes)";
      FileStore.update((s) => {
        s.sets.push(gene_set);
      });
    });

    if (obj_list.length === 2 || obj_list.length === 3) {
      FileStore.update((s) => {
        s.geneObjectList = single_obj_list.concat(obj_list_for_intersections);
      });
    } else {
      FileStore.update((s) => {
        s.geneObjectList = single_obj_list;
      });
    }
  };

  return (
    <Button
      className="shadow-none"
      variant="outline-primary"
      size="sm"
      style={{ display: "inline-block" }}
      disabled={Object.keys(nonFilteredFiles).length === 0}
      onClick={() => {
        handleVennContent();
        handleVisualize();
      }}
    >
      <i className="magic icon"></i> {props.t("visualize.button.label")}
    </Button>
  );
};

export default withTranslation()(VisualizeButton);
