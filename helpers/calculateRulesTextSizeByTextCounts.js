const calculateRulesTextSizeByTextCounts = (rules, fontSize) => {
  const rulesHeightContainer = 334
  const symbolSizes = calculateSymbolSizeByFontSize(fontSize)

  let rulesContentTotalHeight = 0

  rules.forEach(({ name, imgs, text }) => {

    const ruleHeight = calculateRuleHeight(name, text, symbolSizes)
    rulesContentTotalHeight += ruleHeight

  })

  if (rulesContentTotalHeight < rulesHeightContainer) {
    return fontSize
  } else {
    return calculateRulesTextSizeByTextCounts(rules, fontSize - 1)
  }
}

const calculateRuleHeight = (name, text, symbolSizes) => {
  const minRuleHeight = 25
  const ruleWidthContainer = 445.367
  const { symbolWidth, symbolHeight } = symbolSizes
  const lengthSpaceBetweenNameAndText = 1

  const contentLength = name.length + text.length + lengthSpaceBetweenNameAndText
  const contentTotalWidth = symbolWidth * contentLength
  const contentRowCount = contentTotalWidth / ruleWidthContainer
  const contentHeight = parseInt((contentRowCount * symbolHeight).toFixed())

  return contentHeight < minRuleHeight ? minRuleHeight : contentHeight
}

const calculateSymbolSizeByFontSize = (fontSize) => {
  const coeffHeightSymbol = 1.14
  const coeffWidthSymbol = 0.67

  const symbolWidth = fontSize * coeffWidthSymbol
  const symbolHeight = fontSize * coeffHeightSymbol

  return { symbolWidth, symbolHeight }
}

module.exports = calculateRulesTextSizeByTextCounts
