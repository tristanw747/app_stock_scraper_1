"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlBarrons = 'https://www.barrons.com/real-time?mod=hp_LATEST';
export let arrBarrons = [];
export async function afuncBarrons (url) {
  arrBarrons = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.BarronsTheme--headline--1Q8XnyIf', html).each(function () {
    let title = $(this).text();
    arrBarrons.push(title)
  })
}