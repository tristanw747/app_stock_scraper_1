"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


export const urlFomcMinutes = 'https://www.fxstreet.com/economic-calendar/event/e10a1f69-915d-44b1-ad1d-0b8edf7853f3';
export let arrFomcMinutes = [];
export async function afuncFomcMinutes(url) {
  arrFomcMinutes = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  // await page.goto(url, { waitUntil: "domcontentloaded" })
  // await page.goto(url, { waitUntil: "networkidle2" })
  await page.goto(url);
  await page.waitForSelector(".fxs_txt_size_xsmall.fxs_resetMargin.fxs_txt_lightest_clr");



  arrFomcMinutes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".fxs_txt_size_xsmall.fxs_resetMargin.fxs_txt_lightest_clr")).map(x => x.textContent)
  })
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrFomcMinutes)
  await browser.close()
}