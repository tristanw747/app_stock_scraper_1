"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlYahoo = 'https://finance.yahoo.com/';
export let arrYahoo = [];
export async function afuncYahoo (url) {
  arrYahoo = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.js-content-viewer', html).each(function () {
    let title = $(this).text();
    arrYahoo.push(title)
  })
 
}