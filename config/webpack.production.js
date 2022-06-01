const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    extractComments: 'all',
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false
                    }
                }
            }),
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerPort: 4000,
            generateStatsFile: true,
            openAnalyzer: false,
            logLevel: 'info'
        })
    ],
    mode: 'production'
})