import React from "react";
import { useTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";
import '../assets/LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const lang = FileStore.useState((s) => s.language);

  const changeLanguage = (language) => {
    FileStore.update((s) => {
      s.language = language
    });
    i18n.changeLanguage(language);
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
    <div onChange={changeLanguage}>
      <div className="lang">
        <div className={lang}></div>
        <ul className="dropdown">{options}</ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
