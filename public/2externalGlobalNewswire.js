"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
export const urlGlobalNewswire = 'https://www.globenewswire.com/NewsRoom';
export async function afuncGlobalNewswire (url) {
  let arrGlobalNewswire = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.pagging-list-item-text-container', html).each(function () {
    let title = $(this).text();
    arrGlobalNewswire.push(title)
  })
  return arrGlobalNewswire
}
