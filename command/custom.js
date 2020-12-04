'use strict';
const Command = require('common-bin');
const path = require('path');
const cwd = process.cwd();
const fontSpider = require('font-spider');
const fs = require('file-system');

const getTempHtml = (fontPath, yourFont) => {
  const temp = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style type="text/css">
        @font-face {
          font-family: 'myfont';
          src: url('${fontPath}');
          src:
            url('${fontPath}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        .myfont {
          font-family: 'myfont';
        }
      </style>
    </head>

    <body>
    <p class="myfont">${yourFont}</p>
    </body>
    </html>
  `;
  return temp;
};

const getFonts = () => {
  let fonts = [];
  fs.recurseSync(path.join(cwd), function (filepath, relative, filename) {
    const fileType = path.extname(filepath);
    if (fileType !== '.ttf') return;
    const fontPackageName = path.basename(filepath, fileType);
    fonts.push(fontPackageName);
  });
  return fonts;
};

const createHtmlFile = (fonts) => {
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
};
class CustomeCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.options = {
      want: {
        type: 'string',
        alias: 'w',
        default: '',
        description: '-w = "你想保留的字体"',
      },
    };
  }
  // argv是父类传进来的参数
  async run({ argv }) {
    const fonts = getFonts();
    createHtmlFile(fonts);
    const hasCompressHtmls = fonts.map((item) =>
      path.join(cwd, `${item}.html`)
    );
    fontSpider
      .spider(hasCompressHtmls, { silent: false })
      .then((webFonts) => {
        return fontSpider.compressor(webFonts, { backup: true });
      })
      .then((webFonts) => {
        console.log('webFonts:', webFonts);
        // TODO del html
      });
  }
  get description() {
    return 'cut off your big font file';
  }
}

module.exports = CustomeCommand;
