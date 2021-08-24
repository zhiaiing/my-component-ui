const path = require('path');

module.exports = {
  "stories": [
    "../stories/demo/**/*.stories.tsx",
    "../stories/demo/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    // '@storybook/addon-actions',
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async config => {

    config.module.rules[5].oneOf[2].include.push(path.resolve('./stories'));

    config.module.rules[5].oneOf[2].options.extends = path.resolve('./.babelrc');
    
    config.module.rules[5].oneOf.push({
      test: /\.less$/,
      // include: path.resolve(__dirname, '../'),
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-simple-vars', 'postcss-nested'],
            },
          },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: {

              },
            }
          }
        }
      ],
    });

    // config.module.rules.unshift({
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   loaders: [
    //     require.resolve('babel-loader'),
    //     require.resolve('ts-loader')
    //   ],
    // })

    config.resolve.extensions.push('.ts', '.tsx');

    console.log("config +++++ ", config.module.rules[5].oneOf);

    return config;
  },
  babel: async (options) => {
    return {
      ...options,
    }
  },
}