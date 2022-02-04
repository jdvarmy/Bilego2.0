/** @type {import('next').NextConfig} */
const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = withFederatedSidecar({
  name: 'bticket',
  filename: 'static/chunks/ticket.js',
  exposes: {
    './eventTickets': './src/layout/TicketsLayout.tsx',
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  reactStrictMode: true,
});
