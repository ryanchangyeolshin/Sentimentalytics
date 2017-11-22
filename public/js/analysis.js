/* eslint-disable no-unused-vars */

function renderAnalysis(data, id) {
  const $sentiment = document.createElement('div')
  const $row = document.createElement('div')
  const $colFour = document.createElement('div')
  const $listTab = document.createElement('div')

  const $listSearchTerm = renderListGroupItem('search-term', id)
  const $listSentiment = renderListGroupItem('sentiment', id)
  const $listConfidence = renderListGroupItem('confidence', id)

  const $colEight = document.createElement('div')
  const $navTabContent = document.createElement('div')

  const $searchTermContent = renderContent('search-term', data, id)
  const $sentimentContent = renderContent('sentiment', data, id)
  const $confidenceContent = renderContent('confidence', data, id)

  $sentiment.setAttribute('class', 'sentiment rounded mr-lg-5 mb-lg-3 px-lg-4 py-lg-4 animated bounceInUp')
  $row.setAttribute('class', 'row')
  $colFour.setAttribute('class', 'col-4')
  $listTab.setAttribute('class', 'list-group')
  $listTab.setAttribute('id', 'list-tab')
  $listTab.setAttribute('role', 'tablist')
  $colEight.setAttribute('class', 'col-8')
  $navTabContent.setAttribute('class', 'tab-content')
  $navTabContent.setAttribute('id', 'nav-tab-content')

  $navTabContent.appendChild($searchTermContent)
  $navTabContent.appendChild($sentimentContent)
  $navTabContent.appendChild($confidenceContent)
  $colEight.appendChild($navTabContent)

  $listTab.appendChild($listSearchTerm)
  $listTab.appendChild($listSentiment)
  $listTab.appendChild($listConfidence)
  $colFour.appendChild($listTab)

  $row.appendChild($colFour)
  $row.appendChild($colEight)
  $sentiment.appendChild($row)

  return $sentiment
}

function renderListGroupItem(query, id) {
  const $a = document.createElement('a')
  switch (query) {
    case 'search-term':
      $a.setAttribute('class', 'list-group-item list-group-item-action active')
      $a.setAttribute('id', `list-search-term-list-${id}`)
      $a.setAttribute('data-toggle', 'list')
      $a.setAttribute('href', `#list-search-term-${id}`)
      $a.setAttribute('role', 'tab')
      $a.setAttribute('aria-controls', query)

      $a.textContent = 'Search Term'
      break
    case 'sentiment':
      $a.setAttribute('class', 'list-group-item list-group-item-action')
      $a.setAttribute('id', `list-sentiment-list-${id}`)
      $a.setAttribute('data-toggle', 'list')
      $a.setAttribute('href', `#list-sentiment-${id}`)
      $a.setAttribute('role', 'tab')
      $a.setAttribute('aria-controls', query)

      $a.textContent = 'Sentiment'
      break
    default:
      $a.setAttribute('class', 'list-group-item list-group-item-action')
      $a.setAttribute('id', `list-confidence-list-${id}`)
      $a.setAttribute('data-toggle', 'list')
      $a.setAttribute('href', `#list-confidence-${id}`)
      $a.setAttribute('role', 'tab')
      $a.setAttribute('aria-controls', query)

      $a.textContent = 'Confidence Level'
      break
  }
  return $a
}

function renderContent(query, data, id) {
  const $content = document.createElement('div')
  const $h4 = document.createElement('h4')
  $h4.setAttribute('class', 'text-center')

  const $h5 = document.createElement('h5')
  switch (query) {
    case 'search-term':
      $content.setAttribute('class', 'tab-pane fade show active py-lg-2')
      $content.setAttribute('id', `list-search-term-${id}`)
      $content.setAttribute('role', 'tab-panel')
      $content.setAttribute('aria-labelledby', `list-search-term-list-${id}`)

      $h4.textContent = 'Search Term'

      $h5.setAttribute('class', 'text-center mt-3')
      $h5.setAttribute('id', 'term')
      $h5.textContent = data['searchTerm']

      $content.appendChild($h4)
      $content.appendChild($h5)
      break
    case 'sentiment':
      $content.setAttribute('class', 'tab-pane fade py-lg-2 text-center')
      $content.setAttribute('id', `list-sentiment-${id}`)
      $content.setAttribute('role', 'tab-panel')
      $content.setAttribute('aria-labelledby', `list-sentiment-list-${id}`)

      $h4.textContent = 'Sentiment'

      $h5.setAttribute('class', 'mt-3')
      $h5.setAttribute('id', 'term')
      $h5.textContent = `${data['sentiment']}:`

      const $span = document.createElement('span')
      const $img = document.createElement('img')
      $img.setAttribute('class', 'ml-lg-4')
      $img.setAttribute('src', `./images/${data['sentiment'].toLowerCase()}.png`)
      $span.appendChild($img)
      $h5.appendChild($span)

      $content.appendChild($h4)
      $content.appendChild($h5)
      break
    default:
      $content.setAttribute('class', 'tab-pane fade py-lg-2')
      $content.setAttribute('id', `list-confidence-${id}`)
      $content.setAttribute('role', 'tab-panel')
      $content.setAttribute('aria-labelledby', `list-confidence-list-${id}`)

      $h4.textContent = 'Confidence'

      const $pieChart = document.createElement('div')
      $pieChart.setAttribute('id', `viz-${id}`)
      $pieChart.setAttribute('style', 'width: 650px; height: 500px;')
      $content.appendChild($h4)
      $content.appendChild($pieChart)
      break
  }
  return $content
}
