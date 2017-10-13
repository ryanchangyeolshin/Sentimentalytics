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

function clearSentiments($sentiments, $children) {
  while ($sentiments.hasChildNodes()) {
    $sentiments.removeChild($children[0])
  }
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
  postSentiment(term)
  document.querySelector('#search-term').value = ''
})

const $show = document.querySelector('#show')
$show.addEventListener('click', function (event) {
  event.preventDefault()

  const $content = document.querySelector('#content')
  $content.classList.remove('hidden')

  const $sentiments = document.querySelector('.sentiments')
  if ($sentiments.hasChildNodes()) {
    const $children = $sentiments.children
    clearSentiments($sentiments, $children)
  }
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
})
