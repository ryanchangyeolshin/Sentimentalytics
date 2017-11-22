/* global renderAnalysis */
/* global renderNewPie */
/* global renderTable */
/* global TableExport */

function Form($form) {
  const form = new FormData($form)
  const term = {}
  for (let pair of form.entries()) {
    const [ key, value ] = pair
    term[key] = value
  }
  return term
}

function getSentiment(term) {
  return fetch(`/api/terms/${term}`)
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      console.error(err)
    })
}

function getAllSentiments() {
  return fetch('/api/terms/')
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      console.error(err)
    })
}

function deleteSentiments() {
  return fetch('/api/terms/', {
    method: 'DELETE'
  })
}

function showSentiment(numberId, $sentiments, termData) {
  const $sentiment = renderAnalysis(termData, numberId)
  $sentiments.appendChild($sentiment)
  renderNewPie(termData, numberId)
  const $content = document.querySelector('#content')
  $content.classList.remove('hidden')
}

function clearList($content, $sentiments) {
  const $children = document.querySelectorAll('.sentiment')
  $children.forEach(function ($children) {
    $children.setAttribute('class', 'sentiment rounded mr-lg-5 mb-lg-3 px-lg-4 py-lg-4 animated fadeOut')
    setTimeout(function () {
      $sentiments.removeChild($children)
      $content.classList.add('hidden')
    }, 1000)
  })
}

function removeTable($table) {
  if ($table) {
    document.querySelector('.wrapper').removeChild($table)
  }
}

function toggleIcon($icon) {
  switch ($icon.getAttribute('id')) {
    case 'down':
      $icon.setAttribute('class', 'd-flex fa fa-chevron-up fa-3x justify-content-center my-lg-5 animated infinite pulse')
      $icon.setAttribute('id', 'up')
      break
    default:
      $icon.setAttribute('class', 'd-flex fa fa-chevron-down fa-3x justify-content-center my-lg-5 animated infinite pulse')
      $icon.setAttribute('id', 'down')
      break
  }
}

function swapView($viewOne, $viewTwo, $icon) {
  if ($viewOne.classList.contains('hidden')) {
    $viewOne.setAttribute('class', 'container animated flipInX')
    $viewTwo.setAttribute('class', 'hidden')
  }
  else {
    $viewTwo.setAttribute('class', 'container px-lg-5 py-lg-5 animated flipInX')
    $viewOne.setAttribute('class', 'hidden')
  }
  toggleIcon($icon)
}

function randomIdGenerator() {
  var id = ''
  var numAndChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    id += numAndChars.charAt(Math.floor(Math.random() * numAndChars.length))
  }
  return id
}

window.addEventListener('load', function (event) {
  deleteSentiments()
})

const $wrapper = document.querySelector('.wrapper')
$wrapper.addEventListener('click', function (event) {
  const $sentiments = document.querySelector('.sentiments')
  switch (event.target.getAttribute('id')) {
    case 'submit':
      event.preventDefault()
      const form = Form(document.querySelector('.form'))
      if (form['term'] !== '') {
        getSentiment(form['term'])
          .then(function (sentiment) {
            showSentiment(randomIdGenerator(), $sentiments, sentiment)
          })
      }
      document.querySelector('#search-term').value = ''
      break
    case 'clear':
      event.preventDefault()
      const $content = document.querySelector('#content')
      if ($sentiments.hasChildNodes()) {
        deleteSentiments()
        clearList($content, $sentiments)
      }
      break
    case 'down':
    case 'up':
      removeTable(document.querySelector('#table'))
      getAllSentiments()
        .then(function (data) {
          const $table = renderTable(data)
          document.querySelector('.wrapper').appendChild($table)
          swapView(document.querySelector('#main'), document.querySelector('#table'), document.querySelector('i'))
        })
      break
    case 'export':
      const data = new TableExport(document.querySelector('#table'), {
        headers: true,
        footers: true,
        formats: ['csv'],
        filename: 'data',
        bootstrap: false,
        exportButtons: false,
        position: 'bottom',
        ignoreRows: null,
        ignoreCols: null,
        trimWhitespace: true
      })
      const exportData = data.getExportData()['table']['csv']
      data.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension)
      break
  }
})
