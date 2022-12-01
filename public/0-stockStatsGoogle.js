"use strict";
import { load } from 'cheerio';
import unirest from 'unirest';
// import { sharedFinalStocksNoFormat } from './main.js';
// const keywordStockStatsGoogle= sharedFinalStocksNoFormat[0]
// const urlStockStatsGoogle = sharedFinalStocksNoFormat
export let arrStockStatsGoogle1 = [];
export let arrStockStatsGoogle2 = [];

export const getNewsData = (zurl) => {
  return unirest
    .get(`https://www.google.com/search?q=${zurl}+stock&oq=tesla+stock&aqs=chrome`)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })

    .then((response) => {
      let $ = load(response.body);
      let tickerMcap = [];
      let stockInfo = [];
      let arrStockStats = []
      let arrTicker = []
      let arrInfo = []
      arrStockStatsGoogle1 = [];
      arrStockStatsGoogle2 = [];
      $('.iyjjgb').each(function () {
        const scrapeTitle = $(this).text()
        if (scrapeTitle.length > 1) {
          tickerMcap.push(
            scrapeTitle
          )
        }
      })

      $('.kno-rdesc').each(function () {
        const scrapeTitle = $(this).text()
        if (scrapeTitle.length > 1) {
          arrStockStatsGoogle2.push(
            scrapeTitle
          )
        }
      })



      let arrStockStatsGoogle1 = [`Open: $${tickerMcap[0]} | High: $${tickerMcap[1]} | Low: $${tickerMcap[2]} | Market Cap: $${tickerMcap[3]}`,
      `P/E Ratio: ${tickerMcap[4]} | Div Yield: ${tickerMcap[5]} | 52 Week High: $${tickerMcap[6]} | 52 Week Low: $${tickerMcap[7]}`]
      // arrStockStats.push(tickerList)
      // if (stockInfo[0] != undefined) {
      //   arrInfo.push(stockInfo[0])
      // } else if (stockInfo[0] == undefined) {
      //   arrInfo.push('No public company information available')
      // }





      // console.log(tickerList,stockInfo)
    });
};

for (let i = 0; i < sharedFinalStocksNoFormat.length; i++) {
  getNewsData(sharedFinalStocksNoFormat[i]);
}