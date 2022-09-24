const ImageminBlackBox = require("./src/ImageminBlackBox.cjs");

console.time("minify finished!");

const CWD = process.cwd();
var argv = require("minimist")(process.argv.slice(2));

const SRC_FOLDER = argv.srcFolder || `${CWD}/input`; // use absolute path
const TARGET_FOLDER = argv.targetFolder || `${CWD}/output`; // use absolute path
const ACTIVE_PATH = argv.activePath || ``;
const IS_OPTIMUM = argv.isOptimum || false;

console.log(`Source folder: ${SRC_FOLDER}`);
console.log(`Target folder: ${TARGET_FOLDER}`);
console.log(`Active path: ${ACTIVE_PATH ? ACTIVE_PATH : 'everything inside "Source folder"'}`);
console.log(`Is optimum: `, IS_OPTIMUM);

ImageminBlackBox.minify({
  srcFolder: SRC_FOLDER,
  targetFolder: TARGET_FOLDER,
  activePath: ACTIVE_PATH,
  isOptimum: IS_OPTIMUM,
}).then(() => {
  console.timeEnd("minify finished!");
});
