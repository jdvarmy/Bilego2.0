import React from 'react';

const StarIcon = React.forwardRef((props: React.ComponentProps<'svg'>, svgRef) => {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 32 31',
        strokeWidth: 1,
        stroke: 'currentColor',
        'aria-hidden': 'true',
        ref: svgRef,
      },
      props,
    ),
    React.createElement('path', {
      d: 'M17.04 1.31994L20.6 8.53994C20.81 8.96994 21.23 9.27994 21.71 9.34994L29.67 10.5099C30.88 10.6899 31.36 12.1699 30.49 13.0199L24.73 18.6399C24.38 18.9799 24.22 19.4699 24.31 19.9399L25.67 27.8699C25.88 29.0699 24.61 29.9899 23.53 29.4199L16.41 25.6799C15.98 25.4499 15.47 25.4499 15.04 25.6799L7.92001 29.4199C6.84001 29.9899 5.58001 29.0699 5.78001 27.8699L7.14001 19.9399C7.22001 19.4599 7.06001 18.9699 6.72001 18.6399L0.96001 13.0199C0.0900103 12.1699 0.57001 10.6799 1.78001 10.5099L9.74001 9.34994C10.22 9.27994 10.63 8.97994 10.85 8.53994L14.41 1.31994C14.94 0.229941 16.5 0.229941 17.04 1.31994Z',
      stroke: 'white',
      strokeMiterlimit: '10',
    }),
  );
});

export default StarIcon;
