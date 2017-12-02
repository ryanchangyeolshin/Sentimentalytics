/* eslint-disable no-unused-vars */

function renderDashboard(data, id) {
  const $dashboard = document.createElement('div')
  $dashboard.setAttribute('class', 'dashboard')
  $dashboard.setAttribute('id', id)
  const $sentimentContent = renderSentimentContent(data, id)
  $dashboard.appendChild($sentimentContent)
  return $dashboard
}

function renderSentimentContent(data, id) {
  const $sentimentContent = document.createElement('div')
  const $searchTerm = renderTerm(data)
  const $sentiment = renderSentiment(data)
  const $pieChart = renderPieChart(id)
  $sentimentContent.appendChild($searchTerm)
  $sentimentContent.appendChild($sentiment)
  $sentimentContent.appendChild($pieChart)
  return $sentimentContent
}

function renderTerm(data) {
  const $searchTerm = document.createElement('h1')
  $searchTerm.setAttribute('class', 'text-center text-bold text-white')
  $searchTerm.textContent = data['term']
  return $searchTerm
}

function renderSentiment(data) {
  const $sentiment = document.createElement('h3')
  $sentiment.setAttribute('class', 'my-lg-5 text-center text-bold text-white')
  $sentiment.textContent = `Sentiment: ${data['sentiment']}`
  return $sentiment
}

function renderPieChart(id) {
  const $pieChart = document.createElement('div')
  $pieChart.setAttribute('class', 'pie')
  $pieChart.setAttribute('id', `viz-${id}`)
  $pieChart.setAttribute('style', 'width: 650px; height: 500px;')
  return $pieChart
}
