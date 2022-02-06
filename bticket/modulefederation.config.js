const { dependencies } = require('./package.json');

module.exports = {
  name: 'bticket',
  exposes: {
    './appTicket': './src/layout/App.tsx',
  },
  filename: 'ticket.js',
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
