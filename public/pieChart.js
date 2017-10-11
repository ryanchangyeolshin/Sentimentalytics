/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable new-cap */

let pie = new d3pie('pieChart',
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
          'value': 0.780,
          'color': '#2383c1'
        },
        {
          'label': 'Not Confident',
          'value': 0.220,
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
