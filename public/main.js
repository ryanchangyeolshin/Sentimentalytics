/* global renderAnalysis */
/* global renderNewPie */
/* global renderTable */
/* global TableExport */

function getFormData($form) {
  const form = new FormData($form)
  const term = {}
  for (let pair of form.entries()) {
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

window.addEventListener('load', function (event) {
  deleteSentiments()
})

let numberId = 0
const $submit = document.querySelector('#submit')
$submit.addEventListener('click', function (event) {
  event.preventDefault()
  const formData = getFormData(document.querySelector('.form'))
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

const $wrapper = document.querySelector('.wrapper')
$wrapper.addEventListener('click', function (event) {
  switch (event.target.getAttribute('id')) {
    case 'clear':
      event.preventDefault()
      const $content = document.querySelector('#content')
      const $sentiments = document.querySelector('.sentiments')
      if ($sentiments.hasChildNodes()) {
        deleteSentiments()
        clearList($content, $sentiments)
      }
      break
    case 'down':
    case 'up':
      removeTable(document.querySelector('#table'))
      getAllData()
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
    default:
      return null
  }
})
