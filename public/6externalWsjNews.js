"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlWsjNews = 'https://www.wsj.com/news/latest-headlines';
export let arrWsjNews = [];
export async function afuncWsjNews (url) {
  arrWsjNews = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.WSJTheme--headlineText--He1ANr9C', html).each(function () {
    let title = $(this).text();
    arrWsjNews.push(title)
  })
 
}