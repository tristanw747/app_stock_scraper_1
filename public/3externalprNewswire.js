"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlprNewswire = 'https://www.prnewswire.com/news-releases/news-releases-list/?page=1&pagesize=25';
export let arrprNewswire = [];
export async function afuncprNewswire (url) {
  arrprNewswire = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.newsreleaseconsolidatelink', html).each(function () {
    let title = $(this).text();
    arrprNewswire.push(title.replace(/..:..*edt/gi,''))
  })
}