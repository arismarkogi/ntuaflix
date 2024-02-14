const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      '/ntuaflix_api': {
        target: 'https://localhost:9876',
        secure: false
      }
    }
  }
};
