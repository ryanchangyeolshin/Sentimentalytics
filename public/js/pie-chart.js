/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable new-cap */

function renderNewPie(data, id) {
  pie = new d3pie(`pieChart${id}`,
    {
      'header': {
        'title': {
          'fontSize': 22,
          'font': 'verdana'
        },
        'subtitle': {
          'color': '#999999',
          'fontSize': 10,
          'font': 'verdana'
        },
        'titleSubtitlePadding': 12
      },
      'size': {
        'canvasHeight': 407,
        'canvasWidth': 639.33,
        'pieOuterRadius': '100%'
      },
      'data': {
        'smallSegmentGrouping': {
          'enabled': true
        },
        'content': [
          {
            'label': 'Confident',
            'value': (data['confidence'] * 0.01),
            'color': '#2383c1'
          },
          {
            'label': 'Not Confident',
            'value': 1 - (data['confidence'] * 0.01),
            'color': '#64a61f'
          }
        ]
      },
      'labels': {
        'outer': {
          'pieDistance': 40
        },
        'mainLabel': {
          'font': 'verdana',
          'fontSize': 12
        },
        'percentage': {
          'color': '#e1e1e1',
          'font': 'verdana',
          'fontSize': 12,
          'decimalPlaces': 1
        },
        'value': {
          'color': '#e1e1e1',
          'font': 'verdana',
          'fontSize': 12
        },
        'lines': {
          'enabled': true,
          'color': '#cccccc'
        },
        'truncation': {
          'enabled': true
        }
      },
      'effects': {
        'pullOutSegmentOnClick': {
          'speed': 200,
          'size': 20
        }
      },
      'misc': {
        'gradient': {
          'enabled': true,
          'percentage': 100,
          'color': ''
        }
      }
    })
}
