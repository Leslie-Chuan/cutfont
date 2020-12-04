'use strict';
const Command = require('common-bin');
const path = require('path');
const cwd = process.cwd();
const fontSpider = require('font-spider');

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
    const htmlFiles = [path.resolve(__dirname, '../font/index.html')];
    fontSpider
      .spider(htmlFiles, { silent: false })
      .then((webFonts) => {
        return fontSpider.compressor(webFonts, { backup: false });
      })
      .then((webFonts) => {
        console.log('webFonts:', webFonts);
      });
  }
  get description() {
    return 'cut off your big font file';
  }
}

module.exports = CustomeCommand;
