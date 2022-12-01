"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

export const urlFedRates = 'https://www.federalreserve.gov/monetarypolicy/openmarket.htm';
export let arrFedRates = [];
export async function afuncFedRates(url) {
  arrFedRates = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 })
  // await page.goto(url, { waitUntil: "networkidle2" })
  
  arrFedRates = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".pubtables.ng-scope.sticky-table")).map(x => x.textContent)
  })
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrFedRates)

  let rrr = arrFedRates[0].replaceAll(/\t\t\n\t\t\n/g, '<br/>').replaceAll(/\s0\s/gi, '').replaceAll(/date/gi, '')
  .replaceAll(/increase/gi, '').replaceAll(/decrease/gi, '').replaceAll(/level/gi, '').replaceAll(/\(%\)/g, '')
  .replaceAll(/\t\t\t\t\t/g, '  Range:  ').replaceAll(/<br\/>\t\t\t/g, '<br/>').replaceAll(/\t\t\t\n/g, '')
  .replaceAll(/\t\t\t\s\n/g, '')

arrFedRates=[rrr]

  await browser.close()
}