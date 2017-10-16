/* global renderAnalysis */
/* global renderNewPie */

function getData(term) {
  return fetch(`/api/terms/${term}`)
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
    .then(function (res) {
      console.log(res)
    })
    .catch(function (err) {
      console.error(err)
    })
}

function deleteSentiments() {
  return fetch('/api/terms/', {
    method: 'DELETE'
  })
    .then(function (res) {
      console.log(res)
    })
    .catch(function (err) {
      console.error(err)
    })
}

function renderSentiment(term, $sentiments) {
  getData(term['searchTerm'])
    .then(function (termData) {
      if (termData !== null) {
        const $sentiment = renderAnalysis(termData, numberId)
        $sentiments.appendChild($sentiment)
        renderNewPie(termData, numberId)
        const $content = document.querySelector('#content')
        $content.classList.remove('hidden')
        numberId++
      }
      else {
        postSentiment(term)
          .then(function () {
            getData(term['searchTerm'])
              .then(function (termData) {
                const $sentiment = renderAnalysis(termData, numberId)
                $sentiments.appendChild($sentiment)
                renderNewPie(termData, numberId)
                const $content = document.querySelector('#content')
                $content.classList.remove('hidden')
                numberId++
              })
          })
      }
    })
    .catch(function (err) {
      console.error(err)
    })
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

let numberId = 0
const $submit = document.querySelector('#submit')
$submit.addEventListener('click', function (event) {
  event.preventDefault()

  const $form = new FormData(document.querySelector('.form'))
  const term = {}
  for (let pair of $form.entries()) {
    const [ key, value ] = pair
    term[key] = value
  }

  const $sentiments = document.querySelector('.sentiments')
  if (term['searchTerm'] !== '') {
    renderSentiment(term, $sentiments)
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
