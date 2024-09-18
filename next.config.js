/** @type {import('next').NextConfig} */
const nextConfig = {}

const webpack = require('webpack');

module.exports = {
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }))
        
        // Important: return the modified config
        return config;
    }
}


module.exports = nextConfig
