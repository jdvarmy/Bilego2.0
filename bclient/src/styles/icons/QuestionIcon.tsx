import React from 'react';

const QuestionIcon = React.forwardRef((props: React.ComponentProps<'svg'>, svgRef) => {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 16 16',
        fill: 'currentColor',
        'aria-hidden': 'true',
        ref: svgRef,
      },
      props,
    ),
    React.createElement('circle', {
      cx: 8,
      cy: 8,
      r: 8,
      fill: '#00E3B5',
    }),
    React.createElement('path', {
      fillRule: 'evenodd',
      d: 'M7.54883 10.916V12H6.46484V10.916H7.54883ZM5.58594 3.91406C6.40625 3.71875 7.1875 3.62109 7.92969 3.62109C9.94141 3.62109 10.9473 4.38281 10.9473 5.90625C10.9473 7.42969 9.97656 8.19141 8.03516 8.19141H7.54883V9.83203H6.46484V7.3125H8.01758C9.24805 7.3125 9.86328 6.84375 9.86328 5.90625C9.86328 4.96875 9.21875 4.5 7.92969 4.5C7.1875 4.5 6.40625 4.59766 5.58594 4.79297V3.91406Z',
      clipRule: 'evenodd',
      fill: '#07072E',
    }),
  );
});

export default QuestionIcon;
