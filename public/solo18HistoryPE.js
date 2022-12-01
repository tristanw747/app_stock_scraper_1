"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlHistoryPE = 'https://www.currentmarketvaluation.com/models/price-earnings.php';
export let arrHistoryPE = [];
export async function afuncHistoryPE(url) {
  arrHistoryPE = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  // console.log(html)
  let $ = load(html);
  $('.badge.header-status-badge.text-bg-orange.mt-2', html).each(function() {
    arrHistoryPE.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrHistoryPE)
}