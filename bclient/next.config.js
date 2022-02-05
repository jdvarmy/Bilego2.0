/** @type {import('next').NextConfig} */

module.exports = {
  webpack5: true,
  webpack(config, options) {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remoteType: 'var',
        remotes: {
          // bticket: 'bticket', // add this you remotes
        },
        shared: {
          react: {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    );

    return config;
  },
};
