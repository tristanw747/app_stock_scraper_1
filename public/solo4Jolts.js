"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlJolts = 'https://www.bls.gov/jlt/';
export let arrJolts = [];
export let arrJolts2 = [];
export async function afuncJolts(url) {
  arrJolts = [];
  arrJolts2 = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.nr-entry', html).each(function () {
    arrJolts.push($(this).text())
  })
  let eee = arrJolts[0].replaceAll(/\t\t\t\t\t\t\n\t\t\t\n/gi, '<br> <br>')
    .replaceAll(/html.*|.*pdf.*|.*rss.*|.*charts/gi, '').replaceAll(/\|/gi, '')
  let eee2 = arrJolts[1].replaceAll(/\t\t\t\t\t\t\n\t\t\t\n/gi, '<br> <br>')
    .replaceAll(/html.*|.*pdf.*|.*rss.*|.*charts/gi, '').replaceAll(/\|/gi, '')

  arrJolts = [eee2, eee]
  arrJolts = arrJolts.join('')

  $('.highlight-box-green', html).each(function () {
    arrJolts2.push($(this).text())
  })

  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrJolts)
}

