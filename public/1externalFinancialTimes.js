"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlFinancialTimes = 'https://www.ft.com/news-feed';
export let arrFinancialTimes = [];
export async function afuncFinancialTimes (url) {
  arrFinancialTimes = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.o-teaser__heading', html).each(function () {
    let title = $(this).text();
    arrFinancialTimes.push(title)
  })
}