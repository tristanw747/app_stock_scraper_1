"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
export const urlAccessNewswire = 'https://www.accesswire.com/newsroom/';
export let arrAccessNewswire = [];
export let searchTagAccessNewswire = ".w-embed";
export async function afuncAccessNewswire(url, searchTagAccessNewswire) {
  arrAccessNewswire = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache', headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0];
  await page.goto(url);
  // await page.waitForSelector(searchTagAccessNewswire);
  // await page.goto(url, { waitUntil: "domcontentloaded" })
  // await page.goto(url, { waitUntil: "networkidle2" })
  // uncomment below to Troubleshoot
  // const html = await page.content();
  // await fs.writeFile("troubleshootFullHTML.html", html)
  arrAccessNewswire = await page.evaluate((searchTagAccessNewswire) => {
    return Array.from(document.querySelectorAll(searchTagAccessNewswire)).map(x => x.textContent
      .replace(/\s\/\saccesswire/gi, '').replace(/\/.*2022/, ''))
  }, searchTagAccessNewswire
  )
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrAccessNewswire)
  // console.log(arrAccessNewswire)
  await browser.close()
}
