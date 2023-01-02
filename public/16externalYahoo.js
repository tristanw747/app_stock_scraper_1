"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlYahoo = 'https://finance.yahoo.com/news/';
export let arrYahoo = [];
export async function afuncYahoo(url) {

  try {
    let controller = new AbortController();
    let timeId = setTimeout(() => {
      controller.abort()
    }, 9000)
    arrYahoo = [];
    let response = await fetch(url);
    /////
    clearTimeout(timeId)
    let html = await response.text();
    await fs.writeFile("troubleshootFullHTML.html", html)
    let $ = load(html);
    $('.wafer-caas', html).each(function () {
      let title = $(this).text();
      arrYahoo.push(title)
    })
  }
  catch (e) {
    console.log(e)
    return e
  }
}