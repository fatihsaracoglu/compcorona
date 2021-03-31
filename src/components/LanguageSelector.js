import React from "react";
import { useTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";
import { Button, Modal, Alert, Row } from "react-bootstrap";
import '../assets/LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const lang = FileStore.useState((s) => s.language);

  const changeLanguage = () => {
    if (lang === "en") {
      FileStore.update((s) => {
        s.language = "tr"
      });
      i18n.changeLanguage("tr");
    } else if (lang === "tr") {
      FileStore.update((s) => {
        s.language = "en"
      });
      i18n.changeLanguage("en");
    }
  };

  const languages = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
  ];

  const options = languages.map((language, idx) => {
    if (language.code !== lang) {
      return (
        <li key={idx} onClick={() => changeLanguage(language.code)}>
          <div value={language.code} className={language.code}></div>
        </li>
      );
    }
    return true;
  });

  return (
      <div className="lang">
        <button onClick={changeLanguage} class="focus:outline-none bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <i class="fas fa-globe mr-2"></i>
        <span>{lang === "en" ? "EN" : "TR"}</span>
        </button>
      </div>
    
  );
};

export default LanguageSelector;
