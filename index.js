const fs = require('fs');
const {parse} = require('node-html-parser');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const mainTemplate = require('./Templates/JSON/MainTemplate.js');
const pathes = require('./pathes.js');
const path = require("path");

let htmlTemplate;
fs.readFile('./Templates/card.html', (err, data) => {
    htmlTemplate = data.toString();
});

const convertToPdf = async (fileName= '') => {
    fileName = fileName.replace(' ', '');
    const browserPathToTempHtml = `${pathes.browser.tempHtml + fileName}.html`;
    const pathToPdfFile = `${pathes.relative.pdf + fileName}.pdf`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(browserPathToTempHtml);
    await page.pdf({
        format: 'A4',
        path: pathToPdfFile,
        printBackground: true,
    });
    await browser.close();
}

fs.readdir(pathes.relative.html, (err, files) => {
    files.forEach(file => {
        const pathToHtmlFile = pathes.relative.html + file;

        fs.readFile(pathToHtmlFile, async (err, data) => {
            const fileName = file.replace('.html', '')
                .replace(' ', '');
            const parsedDataFromHtml = parse(data.toString());
            const jsonData = mainTemplate(parsedDataFromHtml);
            const htmlAfterTemplate = ejs.render(htmlTemplate, {data: jsonData});

            const pathToTempHtmlFile = `${pathes.relative.tempHtml + fileName}.html`;
            const pathToJSONFile = `${pathes.relative.json + fileName}.json`;

            await fs.writeFileSync(pathToTempHtmlFile, htmlAfterTemplate);
            await fs.writeFileSync(pathToJSONFile, JSON.stringify(jsonData));

            await convertToPdf(fileName);

            // await fs.unlinkSync(pathToTempHtmlFile);
        });
    });
});
