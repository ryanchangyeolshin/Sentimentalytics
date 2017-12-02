/* eslint-disable no-unused-vars */

function renderSearchTerm(data, id) {
  const $sentiment = document.createElement('a')
  const $strong = document.createElement('strong')
  $sentiment.setAttribute('class', 'sentiment list-group-item list-group-item-action my-lg-3 white-text animated bounceInUp')
  $sentiment.setAttribute('id', `sentiment-${id}`)
  $sentiment.setAttribute('data-id', id)
  $sentiment.setAttribute('sentiment', data['sentiment'])
  $sentiment.setAttribute('confidence', data['confidence'])
  $strong.textContent = data['term']
  $sentiment.appendChild($strong)
  return $sentiment
}
