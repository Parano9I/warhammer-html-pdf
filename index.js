const fs = require('fs')
const { parse } = require('node-html-parser')
const ejs = require('ejs')
const puppeteer = require('puppeteer')
const mainTemplate = require('./Templates/JSON/MainTemplate.js')
const pathes = require('./pathes.js')
const path = require('path')

const htmlTemplate = fs.readFileSync('./Templates/ejs/index.ejs').toString();


const convertToPdf = async (fileName = '') => {
  const browserPathToTempHtml = `${pathes.browser.tempHtml + fileName}.html`
  const pathToPdfFile = `${pathes.relative.pdf + fileName}.pdf`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(browserPathToTempHtml)
  await page.pdf({
    format: 'A4',
    path: pathToPdfFile,
    printBackground: true,
  })
  await browser.close()
}


fs.readdir(pathes.relative.html, (err, files) => {
  Promise.all(files.map(fileName => new Promise( async (resolve, reject) => {
    try {
      const pathToHtmlFile = pathes.relative.html + fileName
      const htmlFileBuffer = fs.readFileSync(pathToHtmlFile)
      const parsedDataFromHtml = parse(htmlFileBuffer.toString())
      const jsonData = mainTemplate(parsedDataFromHtml)

      const template = ejs.compile(htmlTemplate, {r_client: true})
      const htmlAfterTemplate = template({data: jsonData})


      const pathToJSONFile = `${pathes.relative.json + fileName}.json`
      const pathToTempHtmlFile = `${pathes.relative.tempHtml + fileName}.html`

      fs.writeFileSync(pathToTempHtmlFile, htmlAfterTemplate)
      fs.writeFileSync(pathToJSONFile, JSON.stringify(jsonData))

      convertToPdf(fileName)

      console.log(fileName + '...Complete')

      resolve(fileName)
    } catch (error){
      reject(error)
    }
  })))
    .catch(error => console.log(error))
})