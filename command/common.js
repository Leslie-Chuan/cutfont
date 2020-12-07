'use strict';
const path = require('path');
const cwd = process.cwd();
const fontSpider = require('font-spider');
const fs = require('file-system');

class Common {
  delCompressedPackages() {
    fs.recurseSync(path.join(cwd), function (filepath, relative, filename) {
      if (!filename || filename.indexOf('_compressed') === -1) return;
      const compressedPackage =
        filename.split('_').slice(1) && filename.split('_').slice(1)[0];
      if (compressedPackage && compressedPackage === 'compressed.ttf') {
        fs.unlinkSync(filepath, (err) => {
          console.error(err);
        });
      }
    });
  }
  backupFontPackages(fonts) {
    console.log('fonts', fonts);
    fonts.forEach((item) => {
      fs.copyFileSync(`${item}.ttf`, `${item}_temp.ttf`, (err) => {
        console.error(err);
      });
    });
  }
  getFonts() {
    let fonts = [];
    fs.recurseSync(path.join(cwd), function (filepath, relative, filename) {
      const fileType = path.extname(filepath);
      if (fileType !== '.ttf') return;
      const fontPackageName = path.basename(filepath, fileType);
      fonts.push(fontPackageName);
    });
    return fonts;
  }
  createHtmlFile(fonts) {
    fonts.forEach((item) => {
      let txt;
      try {
        txt = fs.readFileSync(path.join(cwd, `${item}.txt`), 'utf8');
      } catch (err) {
        console.error(err);
      }
      if (!txt) return;
      const html = getTempHtml(path.join(cwd, `${item}.ttf`), txt);
      fs.writeFileSync(path.join(cwd, `${item}.html`), html);
    });
  }
  run() {
    delCompressedPackages();
    const fonts = getFonts();
    backupFontPackages(fonts);

    createHtmlFile(fonts);
    console.log('runfonts:', fonts);
    const hasCompressHtmls = fonts.map((item) =>
      path.join(cwd, `${item}.html`)
    );
    console.log('hasCompressHtmls:', hasCompressHtmls);

    fontSpider
      .spider(hasCompressHtmls, { silent: false })
      .then((webFonts) => {
        return fontSpider.compressor(webFonts, { backup: false });
      })
      .then((webFonts) => {
        console.log('webFonts:', webFonts);
        fonts.map((item) => {
          const htmlPath = path.join(cwd, `${item}.html`);
          // delete temp html file
          fs.unlinkSync(htmlPath, (err) => {
            console.console.error(err);
          });
          // rename
          fs.renameSync(
            path.join(cwd, `${item}.ttf`),
            path.join(cwd, `${item}_compressed.ttf`),
            (err) => {
              console.error(err);
            }
          );
          fs.renameSync(
            path.join(cwd, `${item}_temp.ttf`),
            path.join(cwd, `${item}.ttf`),
            (err) => {
              console.error(err);
            }
          );
        });
        // TODO del html
      });
  }
}
module.exports = Common;
