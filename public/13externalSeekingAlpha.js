"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
export const urlSeekingAlpha = 'https://seekingalpha.com/market-news';
export let arrSeekingAlpha = [];
export async function afuncSeekingAlpha(url) {
  arrSeekingAlpha = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  // await page.goto(url, { waitUntil: "domcontentloaded"})
  await page.goto(url, { waitUntil: "networkidle2" })
  // await page.goto(url);
  // await page.waitForSelector(".syE");
  //uncomment below to Troubleshoot
  // const html = await page.content();
  // await fs.writeFile("troubleshootFullHTML.html", html)
  
  arrSeekingAlpha = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".syE")).map(x => x.textContent)
  })
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrSeekingAlpha)
  await browser.close()
}