"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlYahoo = 'https://finance.yahoo.com/';
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
    let $ = load(html);
    $('.js-content-viewer', html).each(function () {
      let title = $(this).text();
      arrYahoo.push(title)
    })
  }
  catch (e) {
    console.log(e)
    return e
  }
}