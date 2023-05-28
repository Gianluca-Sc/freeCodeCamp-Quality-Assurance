"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text == "") return res.json({ error: "No text to translate" });
    if (!text || !locale)
      return res.json({ error: "Required field(s) missing" });

    let translation;

    if (locale === "british-to-american") {
      translation = translator.britishToAmerican(text);
    } else if (locale === "american-to-british") {
      translation = translator.americanToBritish(text);
    } else {
      return res.json({ error: "Invalid value for locale field" });
    }

    res.json({ text, translation });
  });
};
