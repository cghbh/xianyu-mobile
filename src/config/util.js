import $ from 'jquery'
function pySegSort (arr, empty) {
  if (!String.prototype.localeCompare) {
    return null
  }
  var letters = '*abcdefghjklmnopqrstwxyz'.split('')
  var zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')

  var segs = []
  var curr
  $.each(letters, function (i) {
    curr = {
      letter: this.toUpperCase(),
      data: []
    }
    $.each(arr, function () {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(this, 'zh') <= 0) && this.localeCompare(zh[i], 'zh') === -1) {
        curr.data.push(this)
      }
    })
    if (empty || curr.data.length) {
      segs.push(curr)
      curr.data.sort(function (a, b) {
        return a.localeCompare(b, 'zh')
      })
    }
  })
  return segs
}

export {
  pySegSort
}
