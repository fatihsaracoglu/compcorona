import { Store } from "pullstate";

export const FileStore = new Store({
  nonFilteredFiles: [],
  filteredFiles: [],
  isFiltered: false,
  rows: [],
  isMaxLimitErrorModalOpen: false,
  isErrorModalOpen: false,
  isErrorModalOpen2: false,
  isErrorModalOpen3: false,
  isEditModalOpen: false,
  isDeleteConfirmationOpen: false,
  toBeDeletedFileName: "",
  isFilterModalOpen: false,
  isPreviewModalOpen: false,
  fileContent: "",
  previousName: "",
  newName: "",
  pValue: 0.05,
  foldChange: 1,
  generateVennDiagram: false,
  activeIndex: 0,
  isValidName: true,
  language: "en",
  sets: [],
  geneObjectList: [],
  isGeneListModalOpen: false,
  geneList: [],
  initialGeneList: [],
  loadedGeneCount: 0,
  isGeneListModalOpen2: false,
  geneListWithoutIntersections: [],
  initialGeneList2: [],
  loadedGeneCount2: 0,
  currentRegionGeneCount: 0,
  isSameNameExistModal: false,
  isGeneListWebsiteOptionModal: false,
  isGeneListButtonPressed: false,
  modalNumber: 0,
  clickedRegionObject: {},
  isPreprocessedDataModalOpen: false,
  selectedPreprocessedData: [],
  options: [
    { value: "SARS", label: "SARS" },
    { value: "MERS", label: "MERS" },
    { value: "SARS_COV2", label: "SARS_COV2" },
  ],
  canBeFiltered: true
});
