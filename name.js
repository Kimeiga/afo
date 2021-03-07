const axios = require("axios");
const prompt = require("prompt");
const ora = require("ora");
const { StreamChat } = require("stream-chat");
const util = require("util");
const blessed = require("neo-blessed");

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

(async () => {
  for (const first of alphabet) {
    for (const second of alphabet) {
      for (const third of alphabet) {
        try {
          const p = await await axios(
            `https://registry.npmjs.org/${first}${second}${third}`
          );

          if (p.error) {
            // Couln't find a package with the tested name
            console.log(first + second + third, "isn't in use.");
          }
        } catch (e) {
          // console.log(e);
          console.log(first + second + third, "isn't in use.");
        }
      }
    }
  }
})();
