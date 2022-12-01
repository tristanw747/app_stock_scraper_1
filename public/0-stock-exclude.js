let temp1 = [
  'reminds investors', 'reports first quarter', 'reports second quarter', 'reports third quarter', 'reports fourth quarter',
  'announces first quarter', 'announces second quarter', 'announces third quarter', 'announces fourth quarter',
  'law firm reminds shareholders', 'on behalf of', 'conference', ' de ', ' une ', ' y ',
  'making the biggest moves', 'thinking about trading', ' un ', 'investors have opportunity to lead',
  ' und ', 'lawsuit has been filed', 'reports fiscal', 'fireside chat', ' encourages ', 'investor call', 'provides second quarter', 'provides third quarter',
  'results for q', 'class action', 'beats estimates', ' to host ', 'direct offering', 'investigation initiated',
  'vote in favor', "Thinking about buying stock in", 'financial results for the quarter', 'cramer', ' applauds ',
  ' gainers ', ' losers', 'catalyst watch', 'non-compliance', 'webinar', 'premarket movers', 'battleground stocks',
  'shareholder meeting', 'stock market movers', 'regulatory announcement', 'convertible senior notes', 'gaap eps of',
  /////////////////////
]

export const arrExternalExclusionList = temp1.map(unit => {
  return unit.toLowerCase()
})
