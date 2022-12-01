
import { load } from 'cheerio';
import unirest from 'unirest';
const zzurl = `https://www.google.com/search?q=tesla+stock&oq=tesla+stock&aqs=chrome`

const getNewsData = (zurl) => {
  return unirest
    .get(zurl)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);
      let tickerMcap = [];
      let stockInfo = [];
      let arrStockStats = []
      let arrTicker = []
      let arrInfo = []
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
          stockInfo.push(
            scrapeTitle
          )
        }
      })
      let tickerList = [`Open: $${tickerMcap[0]} | High: $${tickerMcap[1]} | Low: $${tickerMcap[2]} | Market Cap: $${tickerMcap[3]}`,
      `P/E Ratio: ${tickerMcap[4]} | Div Yield: ${tickerMcap[5]} | 52 Week High: $${tickerMcap[6]} | 52 Week Low: $${tickerMcap[7]}`]
      // arrStockStats.push(tickerList)
      // if (stockInfo[0] != undefined) {
      //   arrInfo.push(stockInfo[0])
      // } else if (stockInfo[0] == undefined) {
      //   arrInfo.push('No public company information available')
      // }
      // console.log(tickerList, stockInfo)
    });
};

console.log(getNewsData(zzurl))
