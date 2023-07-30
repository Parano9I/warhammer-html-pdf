const fs = require('fs');
const { parse } = require('node-html-parser');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const mainTemplate = require('./Templates/JSON/MainTemplate.js');
const pathes = require('./pathes.js');
const path = require('path');
const { browser } = require('./pathes');

const htmlFilesPath = pathes.relative.html;
const templateHtmlFIlesPath = pathes.relative.template;

fs.readdir(htmlFilesPath, async (err, files) => {
  const browser = await puppeteer.launch();
  const templateFiles = fs.readdirSync(pathes.relative.template);
  const templatesBuffer = await getHtmlTemplatesBuffer(templateFiles);

  await Promise.all(
    files.map(
      fileName =>
        new Promise(async (resolve, reject) => {
          try {
            await processHtmlFile(fileName, browser, templatesBuffer);
            resolve(fileName);
          } catch (error) {
            reject(error);
          }
        }),
    ),
  ).catch(error => console.log(error));

  await browser.close();
});

async function processHtmlFile(fileName, browser, templatesBuffer) {
  const pathToHtmlFile = pathes.relative.html + fileName;

  const fileInfo = getFileNameAndExtension(fileName);

  const htmlFileBuffer = fs.readFileSync(pathToHtmlFile);
  const htmlDomTree = parse(htmlFileBuffer.toString());
  const jsonData = mainTemplate(htmlDomTree);

  await Promise.all(
    templatesBuffer.map(
      templateBuffer =>
        new Promise(async (resolve, reject) => {
          try {
            const compiledHtml = templateBuffer.buffer({ data: jsonData });
            const pathToJSONFile = `${pathes.relative.json + fileInfo.fileName}.json`;
            const pathToTempHtmlFile = `${pathes.relative.tempHtml}${templateBuffer.fileName}_${fileName}`;

            fs.writeFileSync(pathToTempHtmlFile, compiledHtml);
            fs.writeFileSync(pathToJSONFile, JSON.stringify(jsonData));

            const pdfFileInfo = {...fileInfo, ...{prefix: templateBuffer.fileName}};

            const page = await browser.newPage();
          
            await convertToPdf(pdfFileInfo, page);
            await page.close();

            // fs.unlinkSync(pathToTempHtmlFile);

            console.log(fileName + '...Complete');

            resolve(fileName);
          } catch (error) {
            reject(error);
          }
        }),
    ),
  ).catch(error => console.log(error));
}

async function getHtmlTemplatesBuffer(fileNames) {
  const results = [];

  await Promise.all(
    fileNames.map(
      fileName =>
        new Promise(async (resolve, reject) => {
          try {
            const pathToTemplate = pathes.relative.template + fileName;
            const templateFileBuffer = fs.readFileSync(pathToTemplate, 'utf8');

            const result = ejs.compile(templateFileBuffer, { r_client: true });
            const fileInfo = getFileNameAndExtension(fileName);

            results.push({
              fileName: fileInfo.fileName,
              buffer: result,
            });

            resolve(fileName);
          } catch (error) {
            reject(error);
          }
        }),
    ),
  ).catch(error => console.log(error));

  return results;
}

function getFileNameAndExtension(filePath) {
  const fileExtension = path.extname(filePath);
  const fileName = path.basename(filePath, fileExtension);

  return {
    fileName,
    fileExtension,
  };
}

async function convertToPdf (fileInfo = {}, page) {
  const browserPathToTempHtml = `${pathes.browser.tempHtml}${fileInfo.prefix}_${fileInfo.fileName}.html`;
  const pathToPdfFile = `${pathes.relative.pdf}${fileInfo.prefix}_${fileInfo.fileName}.pdf`;

  await page.goto(browserPathToTempHtml);
  await page.pdf({
    format: 'A4',
    path: pathToPdfFile,
    printBackground: true,
  });
};
