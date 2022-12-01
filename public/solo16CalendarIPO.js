"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


export const urlCalendarIPO = 'https://www.nasdaq.com/market-activity/ipos';
export let arrCalendarIPO = [];
export async function afuncCalendarIPO(url) {
  arrCalendarIPO = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: false, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  // await page.goto(url, { waitUntil: "domcontentloaded"})
  // await page.goto(url, { waitUntil: "networkidle2" })
  await page.goto(url);
  // await page.waitForSelector(".market-calendar-table__row");
  
  arrCalendarIPO = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("body > div.dialog-off-canvas-main-canvas > div > main > div.page__content > div.market-calendar-layout > div.layout.layout--2-col-large > div > div.ipo-calendar > div > div.market-calendar__body.loaded > div.ipo-calendar__sections-container > div:nth-child(1) > div.market-calendar-table__data > div > table > tbody > tr > td:nth-child(2) > div")).map(x => x.textContent)
  })
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrCalendarIPO)
  await browser.close()
}