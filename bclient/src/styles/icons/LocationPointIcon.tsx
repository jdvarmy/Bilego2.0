import React from 'react';

const LocationPointIcon = React.forwardRef((props: React.ComponentProps<'svg'>, svgRef) => {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 14 19',
        fill: 'currentColor',
        'aria-hidden': 'true',
        ref: svgRef,
      },
      props,
    ),
    React.createElement('path', {
      fillRule: 'evenodd',
      d: 'M7 0C2.74298 0 0 2.65099 0 7.80968C0 14.9029 7 18.5262 7 18.5262C7 18.5262 14 14.9029 14 7.80968C14 2.65099 11.2669 0 7 0ZM7 10.1843C5.26966 10.1843 3.8736 8.73087 3.8736 6.92943C3.8736 5.12798 5.26966 3.67454 7 3.67454C8.73034 3.67454 10.1264 5.12798 10.1264 6.92943C10.1264 8.73087 8.73034 10.1843 7 10.1843Z',
      clipRule: 'evenodd',
    }),
  );
});

export default LocationPointIcon;
