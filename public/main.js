/* global renderAnalysis */
/* global renderNewPie */
/* global renderTableContent */
/* global TableExport */

function getFormData() {
  const $form = new FormData(document.querySelector('.form'))
  const term = {}
  for (let pair of $form.entries()) {
    const [ key, value ] = pair
    term[key] = value
  }
  return term
}

function getData(term) {
  return fetch(`/api/terms/${term}`)
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      console.error(err)
    })
}

function getAllData() {
  return fetch('/api/terms/')
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      console.error(err)
    })
}

function postSentiment(term) {
  return fetch('/api/terms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(term)
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

function toggleContainer($icon) {
  const $container = document.querySelector('#main-container')
  const $table = document.querySelector('#table')
  switch ($icon.getAttribute('id')) {
    case 'down':
      $container.classList.add('hidden')
      $table.setAttribute('class', 'container px-lg-5 py-lg-5 animated flipInX')
      $icon.setAttribute('class', 'd-flex fa fa-chevron-up fa-3x justify-content-center my-lg-5 animated infinite pulse')
      $icon.setAttribute('id', 'up')
      break
    default:
      $table.classList.add('hidden')
      $container.setAttribute('class', 'container animated flipInX')
      $icon.setAttribute('class', 'd-flex fa fa-chevron-down fa-3x justify-content-center my-lg-5 animated infinite pulse')
      $icon.setAttribute('id', 'down')
      break
  }
}

function renderExportButton() {
  const $export = document.createElement('button')
  $export.setAttribute('class', 'btn btn-outline-primary waves-effect mt-lg-4')
  $export.setAttribute('id', 'export')
  $export.setAttribute('data-type', 'csv')
  $export.textContent = 'Export as CSV'
  return $export
}

window.addEventListener('load', function (event) {
  deleteSentiments()
})

let numberId = 0
const $submit = document.querySelector('#submit')
$submit.addEventListener('click', function (event) {
  event.preventDefault()
  const formData = getFormData()
  const $sentiments = document.querySelector('.sentiments')
  if (formData['searchTerm'] !== '') {
    getData(formData['searchTerm'])
      .then(function (termData) {
        if (termData !== null) {
          showSentiment(numberId, $sentiments, termData)
          numberId++
        }
        else {
          postSentiment(formData)
            .then(function () {
              getData(formData['searchTerm'])
                .then(function (termData) {
                  showSentiment(numberId, $sentiments, termData)
                  numberId++
                })
            })
            .catch(function (err) {
              console.error(err)
            })
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }
  document.querySelector('#search-term').value = ''
})

const $clear = document.querySelector('#clear')
$clear.addEventListener('click', function (event) {
  event.preventDefault()
  const $content = document.querySelector('#content')
  const $sentiments = document.querySelector('.sentiments')
  if ($sentiments.hasChildNodes()) {
    deleteSentiments()
    clearList($content, $sentiments)
  }
})

const $transitions = document.querySelector('.transitions')
$transitions.addEventListener('click', function (event) {
  switch (event.target.getAttribute('id')) {
    case 'down':
      const $table = document.querySelector('#table')
      getAllData()
        .then(function (data) {
          if (document.querySelector('.card')) {
            $table.removeChild(document.querySelector('.card'))
          }
          const $tableContent = renderTableContent(data)
          const $export = renderExportButton()
          $table.appendChild($tableContent)
          $table.appendChild($export)
        })
      toggleContainer(event.target)
      break
    default:
      toggleContainer(event.target)
      break
  }
})

const $table = document.querySelector('#table')
$table.addEventListener('click', function (event) {
  if (event.target.nodeName === 'BUTTON') {
    const data = new TableExport($table, {
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
  }
})
