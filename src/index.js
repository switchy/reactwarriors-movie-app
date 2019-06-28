import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { IntlProvider, addLocaleData } from "react-intl";
import enLocale from "react-intl/locale-data/en";
import deLocale from "react-intl/locale-data/de";
import ukLocale from "react-intl/locale-data/uk";

import messagesUk from "./translations/uk";
import messagesDe from "./translations/de";
import messagesEn from "./translations/en";

const localeData = {
  uk: messagesUk,
  de: messagesDe,
  en: messagesEn
};

addLocaleData([...enLocale, ...ukLocale, ...deLocale]);

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages =
  localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData.en;

ReactDOM.render(
  <IntlProvider locale={language} messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
