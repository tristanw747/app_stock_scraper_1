"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlWsjFinance = 'https://www.wsj.com/news/business?mod=nav_top_section';
export let arrWsjFinance = [];
export async function afuncWsjFinance (url) {
  arrWsjFinance = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.WSJTheme--summaryText--2LRaCWgJ', html).each(function () {
    let title = $(this).text();
    arrWsjFinance.push(title)
  })
 
}