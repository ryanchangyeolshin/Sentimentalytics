/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* global d3plus */

function renderNewPie(data, id) {
  let sentimentPieData = [
    {'value': parseFloat(data['confidence'], 10), 'name': 'Confident'},
    {'value': 100 - parseFloat(data['confidence'], 10), 'name': 'Not Confident'}
  ]
  let confidencePie = new d3plus.viz()
    .container(`#viz-${id}`)
    .data(sentimentPieData)
    .type('pie')
    .id('name')
    .labels({
      'align': 'center',
      'valign': 'middle',
      'resize': false,
      'font': {
        'size': 20
      }
    })
    .size('value')
    .draw()
}
