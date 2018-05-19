
// http://dontkry.com/posts/code/single-page-modules-with-webpack.html
// --
// webpack.config.js
module.exports = {
  entry: 'app/index.js',
  output: {
    path: 'dist/',
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
};

//#345058