import * as fs from 'fs';
import {parse} from 'node-html-parser';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import mainTemplate from './Templates/JSON/MainTemplate.js';

let htmlTemplate;

fs.readFile("./Templates/card.html", (err, data) => {
    htmlTemplate = data.toString();
});

fs.readFile("./assets/html/Duvale.html", async (err, data) => {
    const resultData = parse(data.toString());
    const jsonData = (mainTemplate(resultData));

    const resultHTML = ejs.render(htmlTemplate, {data: jsonData});

    const browser = await puppeteer.launch({
        // headless: true,
        executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage({
        executablePath: '/usr/bin/chromium-browser'
    });
    await page.setContent(resultHTML, {
        waitUntil: 'domcontentloaded'
    });
    await page.pdf({
        format: 'A4',
        path: `./assets/pdf/test.pdf`
    });
    await browser.close();

    // fs.writeFileSync('./assets/pdf/Duvale.html', resultHTML);


    // fs.writeFileSync('./assets/json/Duvale.json', jsonData);
});