import React from "react";
import Cookies from "universal-cookie";
import { IntlProvider, addLocaleData } from "react-intl";
import enLocale from "react-intl/locale-data/en";
import deLocale from "react-intl/locale-data/de";
import ukLocale from "react-intl/locale-data/uk";
import messagesUk from "../translations/uk";
import messagesDe from "../translations/de";
import messagesEn from "../translations/en";
import App from "./App";

const localeData = {
  uk: messagesUk,
  de: messagesDe,
  en: messagesEn
};

addLocaleData([...enLocale, ...ukLocale, ...deLocale]);

const cookies = new Cookies();

const languageInit =
  cookies.get("language")
  || (navigator.languages && navigator.languages[0])
  || navigator.language;


class AppLocale extends React.Component {
  messages = null;

  constructor() {
    super();

    // Split locales with a region code
    let language = languageInit.toLowerCase().split(/[_-]+/)[0];

    // Try full locale, try locale without region code, fallback to 'en'
    this.messages =
      localeData[language]
      || localeData.en;

    this.state = {
      language
    };

  }

  changeLanguage = (language) => {
    cookies.set("language", language, {
      path: "/",
      maxAge: 2592000
    });
    this.messages = localeData[language];
    this.setState({
      language
    });
  };

  render() {
    return (
      <IntlProvider locale={this.state.language} messages={this.messages}>
        <App onChangeLanguage={this.changeLanguage} language={this.state.language} locales={["en", "de", "uk"]}/>
      </IntlProvider>
    )
  }
}

export default AppLocale;