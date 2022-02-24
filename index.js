const ImageminBlackBox = require('./src/ImageminBlackBox.cjs');

ImageminBlackBox.minify({
  srcFolder: 'input',
  targetFolder: 'output',
  subPath: 'assets/images',
  isOptimum: false,
}).then(() => {
  console.log('minify finished!');
});
