"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlIndexPCE = 'https://www.bea.gov/data/personal-consumption-expenditures-price-index';
export let arrIndexPCE = [];
export async function afuncIndexPCE(url) {
  arrIndexPCE = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.center-block', html).each(function() {
    arrIndexPCE.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrIndexPCE)
}