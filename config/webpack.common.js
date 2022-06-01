const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/scripts/index.js',
	mode: 'development',
	performance: { hints: false },
	output: {
		path: path.resolve(__dirname, '../build'),
		publicPath: path.resolve(__dirname, '../build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ["@babel/env"],
					plugins: [
						['transform-class-properties'],
						['transform-object-rest-spread'],
					],
				},
			}, {
				loader: 'eslint-loader'
			}]
		}, {
			test: /\.(png|jpg|gif|json|mp4|ico)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: './assets/[name].[ext]',
				},
			}, ],
		}, {
			test: /\.(scss)$/,
			use: [miniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader',
			],
		}, {
			test: /\.css$/,
				use: {
					loader: 'css-loader',
					options: { url: false }
				}
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader",
			options: {
				limit: 10000,
				name: './assets/fonts/[name].[ext]',
				mimetype: 'application/octet-stream',
				publicPath: '../wp-content/themes/wp-boilerplate/'
			}
		}, ],
	},
	resolve: {
		alias: {
			"@" : path.resolve(__dirname, '../src/scripts'),
		},
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new miniCssExtractPlugin({
			filename: 'style.css',
		}),
		new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: './src',
						to: './',
						force: true,
						globOptions: {
							ignore: ['*.js', '*.css', '.DS_Store'],
						},
					}
				],
			}
		),
	],
}