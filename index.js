const ImageminBlackBox = require("./src/ImageminBlackBox.cjs");

console.time("minify finished!");

ImageminBlackBox.minify({
  srcFolder: "input",
  targetFolder: "output",
  subPath: "assets/images",
  isOptimum: false,
}).then(() => {
  console.timeEnd("minify finished!");
});
