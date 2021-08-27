const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ts = require('typescript');
const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin").default;

const docgen = require("react-docgen-typescript");


const options = {
  savePropValueAsString: true,
  skipChildrenPropWithoutDoc: true,
  propFilter(prop, source) {
    if (prop.parent) {

      // console.log("prop ", prop, source);

      return true
    }
    return true
  },
};

// Parse a file for docgen info
// const a = docgen.parse(path.resolve("./src/columnLayout/index.tsx"), options);

const a = docgen.parse(path.resolve("./src/button/src/button.tsx"), options);

// console.log("!!!! ", a);


module.exports = {
  "stories": [
    "../stories/demo/**/*.stories.tsx",
    "../stories/demo/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  logLevel: 'debug',
  "addons": [
    "@storybook/addon-links",
    '@storybook/addon-actions',
    "@storybook/addon-essentials",
    '@storybook/addon-controls',
    '@storybook/addons',
    // '@storybook/addon-storysource',
    // '@storybook/addon-storyshots',
    {
      // fix less no effect  https://github.com/storybookjs/storybook/issues/9796
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["less"]
        }
      }
    },
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     sourceLoaderOptions: {
    //       parser: 'typescript',
    //       injectStoryParameters: true,
    //     },
    //   },
    // },
  ],
  webpackFinal: async config => {

    // console.log("aaaa ", config.module.rules);
    if (config.module.rules[5].oneOf) {
      config.module.rules[5].oneOf[2].include.push(path.resolve('./stories'));
      config.module.rules[5].oneOf[2].options.extends = path.resolve('./.babelrc');

      config.module.rules[5].oneOf.splice(0, 0, {
        test: /\.(less)$/,
        // include: path.resolve(__dirname, '../'),
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          'css-loader',
          {
            loader: require.resolve('less-loader'),
            options: {
              lessOptions: {
                strictMath: false,
                // noIeCompat: true,
                javascriptEnabled: true,
                modifyVars: {

                },
              }
            }
          }
        ],
      });
    }

    config.resolve.extensions.push('.ts', '.tsx', '.d.ts');
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
      })
    )

    config.plugins.push(
      new ReactDocgenTypescriptPlugin(
        {
          tsconfigPath: path.resolve("../tsconfig.json"),
          include: ['src/**/*.tsx'],
        }
      ),
    )

    // config.plugins.push(
    //   new ReactDocgenTypescriptPlugin(),
    // )


    // console.log("config +++++ ", config.module.rules[5].oneOf);

    return config;
  },
  babel: async (options) => {
    return {
      ...options,
    }
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   compilerOptions: {
    //     allowSyntheticDefaultImports: false,
    //     esModuleInterop: false,
    //   },
    // }
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
        tsconfigPath: path.resolve("../tsconfig.json") 
      },
      propFilter: (prop) => {

        const aa = (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true);
        if (aa) {
          console.log(prop.name);
        }
        return aa
      },
    },
  },
  plugins: [
    // Will default to loading your root tsconfig.json
    new ReactDocgenTypescriptPlugin(
      { tsconfigPath: path.resolve("../tsconfig.json") }
    ),
    // or with a specific tsconfig
    // new ReactDocgenTypescriptPlugin({ tsconfigPath: "./tsconfig.dev.json" }),
    // // or with compiler options
    // new ReactDocgenTypescriptPlugin({ compilerOptions: { jsx: ts.JsxEmit.Preserve } }),
  ],
}