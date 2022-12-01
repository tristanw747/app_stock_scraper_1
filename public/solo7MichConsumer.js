"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlMichConsumer = 'https://www.investing.com/economic-calendar/michigan-consumer-sentiment-320';
export let arrMichConsumer = [];
export async function afuncMichConsumer(url) {
  arrMichConsumer = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.genTbl.openTbl.ecHistoryTbl', html).each(function () {
    arrMichConsumer.push($(this).text())
  })

  let yyy = arrMichConsumer[0].replaceAll(/\n\n\n\n\n/g, '\n\n\n\n').replaceAll(/\n\n\n\n/g, '<br\/>')
    .replaceAll(/\n\n\n/g, '').replaceAll(/\n\n/g, '').replaceAll(/\s\n/g, '').replaceAll(/\n/g, '\n|\n')
  arrMichConsumer=[yyy]
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrMichConsumer)
}