const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const highlightWord = (word) => `<span class="highlight">${word}</span>`;

class Translator {
  britishToAmerican(text) {
    let translation = [];
    text = text.split(" ");

    let i = 0;
    while (i < text.length) {
      const word = text[i].toLowerCase();
      const cleanWord = word.replace(/\W/g, "");

      let secondWord = "";
      let cleanSecondWord = "";
      let thirdWord = "";
      let cleanThirdWord = "";

      if (i + 1 < text.length) {
        secondWord = text[i + 1].toLowerCase();

        cleanSecondWord = secondWord.replace(/\W/g, "");
      }

      if (i + 2 < text.length) {
        thirdWord = text[i + 2].toLowerCase();
        cleanThirdWord = thirdWord.replace(/\W/g, "");
      }

      // britishOnly
      if (britishOnly.hasOwnProperty(cleanWord)) {
        word = word.replace(cleanWord, britishOnly[cleanWord]);
        translation.push(highlightWord(word));
      } else if (
        // check triple word
        britishOnly.hasOwnProperty(
          `${cleanWord} ${cleanSecondWord} ${cleanThirdWord}`
        )
      ) {
        word = word.replace(
          cleanWord,
          britishOnly[`${cleanWord} ${cleanSecondWord} ${cleanThirdWord}`]
        );
        translation.push(highlightWord(word));
        i += 2;
      } else if (
        // check double word
        britishOnly.hasOwnProperty(`${cleanWord} ${cleanSecondWord}`)
      ) {
        word = word.replace(
          cleanWord,
          britishOnly[`${cleanWord} ${cleanSecondWord}`]
        );
        translation.push(highlightWord(word));
        i++;
      }
      //titles
      else if (Object.values(americanToBritishTitles).includes(word)) {
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
          if (word === value) {
            translation.push(highlightWord(text[i] + "."));
            break;
          }
        }
      }
      //americanToBritishSpelling
      else if (Object.values(americanToBritishSpelling).includes(word)) {
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
          if (word === value) {
            translation.push(highlightWord(key));
            break;
          }
        }
      }
      // time
      else if (/[0-9]{1,2}.[0-9]{2}\.?/.test(word)) {
        if (word.endsWith(".")) {
          translation.push(
            highlightWord(word.substring(0, word.length - 1)).replace(
              ".",
              ":"
            ) + "."
          );
        } else {
          translation.push(highlightWord(word.replace(".", ":")));
        }
      } else {
        translation.push(text[i]);
      }
      i++;
    }

    const isSame = translation.every(
      (w, i) => w.toLowerCase() === text[i].toLowerCase()
    );

    return isSame ? "Everything looks good to me!" : translation.join(" ");
  }

  americanToBritish(text) {
    let translation = [];
    text = text.split(" ");

    let i = 0;
    while (i < text.length) {
      const word = text[i].toLowerCase();
      const cleanWord = word.replace(/\W/g, "");

      let secondWord = "";
      let cleanSecondWord = "";
      let thirdWord = "";
      let cleanThirdWord = "";

      if (i + 1 < text.length) {
        secondWord = text[i + 1].toLowerCase();
        cleanSecondWord = secondWord.replace(/\W/g, "");
      }

      if (i + 2 < text.length) {
        thirdWord = text[i + 2].toLowerCase();
        cleanThirdWord = thirdWord.replace(/\W/g, "");
      }

      // americanOnly
      if (americanOnly.hasOwnProperty(cleanWord)) {
        word = word.replace(cleanWord, americanOnly[cleanWord]);
        translation.push(highlightWord(word));
      } else if (
        // check triple word
        americanOnly.hasOwnProperty(
          `${cleanWord} ${cleanSecondWord} ${cleanThirdWord}`
        )
      ) {
        word = word.replace(
          cleanWord,
          americanOnly[`${cleanWord} ${cleanSecondWord} ${cleanThirdWord}`]
        );
        translation.push(highlightWord(word));
        i += 2;
      } else if (
        // check double word
        americanOnly.hasOwnProperty(`${cleanWord} ${cleanSecondWord}`)
      ) {
        word = word.replace(
          cleanWord,
          americanOnly[`${cleanWord} ${cleanSecondWord}`]
        );
        translation.push(highlightWord(word));
        i++;
      }
      // titles
      else if (americanToBritishTitles.hasOwnProperty(word)) {
        translation.push(highlightWord(text[i].slice(0, -1)));
      }
      // americanToBritishSpelling
      else if (americanToBritishSpelling.hasOwnProperty(word)) {
        translation.push(highlightWord(americanToBritishSpelling[word]));
      }
      // time
      else if (/[0-2][0-9]:[0-9]{2}/.test(word)) {
        translation.push(highlightWord(word.split(":").join(".")));
      } else {
        translation.push(text[i]);
      }
      i++;
    }

    const isSame = translation.every(
      (w, i) => w.toLowerCase() === text[i].toLowerCase()
    );

    return isSame ? "Everything looks good to me!" : translation.join(" ");
  }
}

module.exports = Translator;
