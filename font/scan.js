const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const yargs = require('yargs');
const globby = require('globby');
const argv = yargs.argv;
const nameList = argv.name.split(','); // 读取以-分隔的参数
let myFont = '<!-- font.html该文件在构建前可以删除 --><link rel="stylesheet" href="./src/public/common/css/public.css">'; // 引用自定义字体

(async () => {
   const SRC_PATH = path.resolve(__dirname, './src'); // 使用绝对地址操作
   const paths = globby.sync(`${SRC_PATH}/**/*.html`);

   paths.forEach((filePath) => {
     fs.readFile(filePath, 'utf8',(err, data) => {
       let $ = cheerio.load(data); // cheerio 序列化读取的file
        nameList.forEach((classItem)=> { // 根据命令行传递的参数来循环
          let customStr = $('.custom-font-' + classItem).text();
          if(customStr && customStr.length > 0) {
            let dom = `<div class='custom-font-${classItem}'>${customStr}</div>`;
            myFont += dom;
            fs.writeFile('./font-test.html', myFont, () => { // 将应用的自定义字体，如 custom-font-xxx，收集写到font-test.html,然后font-spider根据font-test.html中的文本进行压缩 
              console.log('写入成功')
            })
          }
        });
     });
   })
})();