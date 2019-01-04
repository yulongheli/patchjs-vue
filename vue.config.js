const fs = require('fs');
const PatchjsWebpackPlugin = require('patchjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const pages = {
  index: {
    entry: 'src/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Index Page'
  },
  detail: {
    entry: 'src/detail.js',
    // 模板来源
    template: 'public/detail.html',
    // 在 dist/index.html 的输出
    filename: 'detail.html',
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'detail Page'
  }
};

module.exports = {
  pages: pages,
  configureWebpack: () => {
    const newConfig = {};
    newConfig.output = {};
    newConfig.output.filename = `${pkg.name}/${pkg.version}/[name].js`;
    newConfig.output.chunkFilename = `${pkg.name}/${pkg.version}/[name].js`;

    newConfig.plugins = [];
    newConfig.plugins.push(new PatchjsWebpackPlugin({ increment: false }));
    newConfig.plugins.push(new MiniCssExtractPlugin({
      filename: `${pkg.name}/${pkg.version}/[name].css`,
    }));
    return newConfig;
  },
  chainWebpack: (config) => {
    config.plugins.delete('extract-css');
    Object.keys(pages).forEach((key) => {
      config.plugin(`html-${key}`).tap(args => {
        args[0].inject = false;
        args[0].version = pkg.version;
        args[0].env = process.env.NODE_ENV;
        return args
      })
    });
  },
};
