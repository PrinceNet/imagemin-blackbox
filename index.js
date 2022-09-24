const ImageminBlackBox = require("./src/ImageminBlackBox.cjs");

console.time("ImageminBlackBox:: minify complete");

const CWD = process.cwd();
const ARGV = require("minimist")(process.argv.slice(2));

const SRC_FOLDER = ARGV.srcFolder || `${CWD}/input`; // use absolute path
const TARGET_FOLDER = ARGV.targetFolder || `${CWD}/output`; // use absolute path
const ACTIVE_PATH = ARGV.activePath || ``;
const IS_OPTIMUM = ARGV.isOptimum || false;

ImageminBlackBox.minify({
  srcFolder: SRC_FOLDER,
  targetFolder: TARGET_FOLDER,
  activePath: ACTIVE_PATH,
  isOptimum: IS_OPTIMUM,
}).then(() => {
  console.timeEnd("ImageminBlackBox:: minify complete");
});
