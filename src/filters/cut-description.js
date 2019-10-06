const cutWords = {}

function filterCutWords (words) {
  let wordsfilter = ''

  if (words.length > 22) {
    wordsfilter = words.substring(0, 22) + ' ...'
  } else if (words.length <= 22) {
    wordsfilter = words
  }
  return `${wordsfilter}`
}

cutWords.install = function (Vue) {
  Vue.filter('cut-description', (val) => {
    return filterCutWords(val)
  })
}

export default cutWords
