"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


export const urlReverseRepo = 'https://www.newyorkfed.org/markets/data-hub';
export let arrReverseRepo = [];
export async function afuncReverseRepo(url) {
  arrReverseRepo = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  // await page.goto(url, { waitUntil: "domcontentloaded"})
  // await page.goto(url, { waitUntil: "networkidle2" })
  await page.goto(url);
  await page.waitForSelector(".value");
  
  arrReverseRepo = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".value")).map(x => x.textContent)
  })
  arrReverseRepo=[`Balance: $${arrReverseRepo[5]} (in billions)`, '<br>', `Current Rate: ${arrReverseRepo[6]}%`]
  arrReverseRepo = arrReverseRepo.join(' ')
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrReverseRepo)
  await browser.close()
}