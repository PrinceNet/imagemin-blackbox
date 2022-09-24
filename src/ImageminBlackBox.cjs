const fs = require("fs");
const path = require("path");

class ImageminBlackBox {
  constructor() {}

  getFilesByFileExt(dir, _ext, _files) {
    _files = _files || [];
    _ext = _ext || false;
    const files = fs.readdirSync(dir);

    for (const i in files) {
      const name = dir + "/" + files[i];

      if (fs.statSync(name).isDirectory()) {
        this.getFilesByFileExt(name, _ext, _files);
      } else {
        if (typeof _ext === "string") {
          if (name.indexOf(_ext) > 0) {
            _files.push(name);
          }
        } else if (Array.isArray(_ext)) {
          for (let extIndex = 0; extIndex < _ext.length; extIndex++) {
            const currentExt = _ext[extIndex];

            if (name.indexOf(currentExt) > 0) {
              _files.push(name);
            }
          }

          if (name.indexOf(_ext) > 0) {
            _files.push(name);
          }
        } else {
          _files.push(name);
        }
      }
    }

    return _files.map((file) => file.split("//").join("/"));
  }

  _minifySingleImage(_options = {}) {
    if (!_options.srcPath) {
      throw new Error(`ImageminBlackBox:: no 'src' provided !`);
    }

    if (!_options.targetPath) {
      throw new Error(`ImageminBlackBox:: no 'target' provided !`);
    }

    return new Promise((resolve, reject) => {
      try {
        (async () => {
          const imagemin = (await import("imagemin")).default;
          let plugins;

          if (_options.isOptimum) {
            const imageminOptipng = (await import("imagemin-optipng")).default;
            const imageminJpegtran = (await import("imagemin-jpegtran")).default;

            plugins = [imageminOptipng(), imageminJpegtran({ progressive: true })];
          } else {
            const imageminPngquant = (await import("imagemin-pngquant")).default;
            const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;

            plugins = [imageminPngquant({ speed: 1, quality: [0.3, 1], strip: true }), imageminMozjpeg()];
          }

          await imagemin([_options.srcPath], {
            destination: _options.targetPath,
            plugins: plugins,
          });

          resolve();
        })();
      } catch (error) {
        reject(`ImageminBlackBox:: ${error}`);
      }
    });
  }

  minify(_options = {}) {
    _options.activePath = _options.activePath || "";
    _options.isOptimum = !!_options.isOptimum;

    if (!_options.srcFolder) {
      throw new Error(`ImageminBlackBox:: no 'srcFolder' provided !`);
    }

    if (!_options.targetFolder) {
      throw new Error(`ImageminBlackBox:: no 'targetFolder' provided !`);
    }

    return new Promise(async (resolve, reject) => {
      try {
        const validFileExt = [".png", ".jpg", ".jpeg"];
        const pngFiles = this.getFilesByFileExt(`${_options.srcFolder}/${_options.activePath}`, validFileExt);

        for (let index = 0; index < pngFiles.length; index++) {
          const srcFilePath = pngFiles[index];
          const targetFilePath = path.dirname(
            srcFilePath.replace(`${_options.srcFolder}/`, `${_options.targetFolder}/`)
          );

          await this._minifySingleImage({
            srcPath: srcFilePath,
            targetPath: targetFilePath,
            isOptimum: _options.isOptimum,
          });
        }

        resolve();
      } catch (error) {
        reject(`ImageminBlackBox:: ${error}`);
      }
    });
  }
}

module.exports = new ImageminBlackBox();
