fetch('https://www.bloomberg.com/feeds/markets/sitemap_recent.xml')
.then(res=>res.json())
.then(data=> console.log(data))




