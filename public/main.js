/* global renderAnalysis */
/* global renderNewPie */

function getData() {
  return fetch('/api/terms/')
    .then(function (res) {
      return res.json()
    })
}

function postSentiment(term) {
  fetch('/api/terms/', {
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

function clearList($sentiments) {
  const $children = document.querySelectorAll('.sentiment')
  $children.forEach(function ($children) {
    $children.setAttribute('class', 'sentiment rounded mr-lg-5 mb-lg-3 px-lg-4 py-lg-4 animated fadeOut')
    setTimeout(function () {
      $sentiments.removeChild($children)
    }, 1000)
  })
}

function disableButton($button) {
  $button.classList.add('disabled')
}

function enableButton($button) {
  $button.classList.remove('disabled')
}

const $submit = document.querySelector('#submit')
$submit.addEventListener('click', function (event) {
  event.preventDefault()

  const $form = new FormData(document.querySelector('.form'))
  const term = {}
  for (let pair of $form.entries()) {
    const [ key, value ] = pair
    term[key] = value
  }
  if (term['searchTerm'] !== '') {
    postSentiment(term)
  }
  document.querySelector('#search-term').value = ''
  enableButton($show)
})

const $show = document.querySelector('#show')
$show.addEventListener('click', function (event) {
  event.preventDefault()

  const $sentiments = document.querySelector('.sentiments')
  const $children = document.querySelectorAll('.sentiment')
  $children.forEach(function ($children) {
    $sentiments.removeChild($children)
  })

  let numberId = 0
  getData()
    .then(function (terms) {
      terms.forEach(function (term) {
        const $sentiment = renderAnalysis(term, numberId)
        $sentiments.appendChild($sentiment)
        renderNewPie(term, numberId)
        numberId++
      })
    })
    .catch(function (err) {
      console.error(err)
    })
  disableButton($show)
})

const $clear = document.querySelector('#clear')
$clear.addEventListener('click', function (event) {
  event.preventDefault()
  const $sentiments = document.querySelector('.sentiments')
  if ($sentiments.hasChildNodes()) {
    deleteSentiments()
    clearList($sentiments)
  }
  enableButton($show)
})
