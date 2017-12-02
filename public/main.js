/* global renderSearchTerm */
/* global renderDashboard */
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
      throw err
    })
}

function getAllSentiments() {
  return fetch('/api/terms/')
    .then(function (res) {
      return res.json()
    })
    .catch(function (err) {
      throw err
    })
}

function deleteSentiments() {
  return fetch('/api/terms/', {
    method: 'DELETE'
  })
}

function showSentiment(numberId, $sentiments, termData) {
  const $sentiment = renderSearchTerm(termData, numberId)
  $sentiments.appendChild($sentiment)
  const $content = document.querySelector('#content')
  $content.classList.remove('hidden')
}

function clearList($content, $sentiments) {
  const $children = document.querySelectorAll('.sentiment')
  $children.forEach(function ($children) {
    $children.setAttribute('class', 'sentiment list-group-item list-group-item-action my-lg-3 white-text animated fadeOut')
    setTimeout(function () {
      $sentiments.removeChild($children)
      $content.classList.add('hidden')
    }, 1000)
  })
}

function removeContainer($container) {
  if ($container) {
    document.querySelector('.wrapper').removeChild($container)
  }
}

function toggleIcon($icon) {
  switch ($icon.getAttribute('id')) {
    case 'down':
      $icon.setAttribute('class', 'd-flex fa fa-chevron-up fa-3x justify-content-center my-lg-5 white-text animated infinite pulse')
      $icon.setAttribute('id', 'up')
      break
    default:
      $icon.setAttribute('class', 'd-flex fa fa-chevron-down fa-3x justify-content-center my-lg-5 white-text animated infinite pulse')
      $icon.setAttribute('id', 'down')
      break
  }
}

function swapView($container) {
  const $main = document.querySelector('#main')
  switch ($container.getAttribute('id')) {
    case 'main':
      $container.setAttribute('class', 'hidden')
      const $table = document.querySelector('#table')
      $table.setAttribute('class', 'container px-lg-5 py-lg-5 animated flipInX')
      break
    case 'table':
      $container.setAttribute('class', 'hidden')
      $main.setAttribute('class', 'container animated flipInX')
      break
    default:
      $wrapper.removeChild($container)
      $main.setAttribute('class', 'container px-lg-5 py-lg-5 animated flipInX')
  }
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
      getAllSentiments()
        .then(function (data) {
          const $table = renderTable(data)
          document.querySelector('.wrapper').appendChild($table)
          swapView(document.querySelector('.container'))
          toggleIcon(document.querySelector('i'))
        })
      break
    case 'up':
      swapView(document.querySelector('.container'))
      toggleIcon(document.querySelector('i'))
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

const $sentiments = document.querySelector('.sentiments')
$sentiments.addEventListener('click', async function (event) {
  const id = event.target.getAttribute('data-id')
  removeContainer(document.querySelector(`#${id}`))
  if (id) {
    let data = {
      id,
      term: event.target.textContent,
      sentiment: event.target.getAttribute('sentiment'),
      confidence: event.target.getAttribute('confidence')
    }
    const $dashboard = renderDashboard(data, id)
    $dashboard.setAttribute('class', 'container dashboard px-lg-5 py-lg-5 animated flipInX')
    document.querySelector('#main').setAttribute('class', 'hidden')
    $wrapper.appendChild($dashboard)
    renderNewPie(data, id)
    toggleIcon(document.querySelector('i'))
  }
})
