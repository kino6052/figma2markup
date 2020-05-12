var path = require("path");

module.exports = {
  entry: ['./src/index.ts', './src/parser.ts'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "code.js",
    globalObject: 'this',
    path: path.resolve(__dirname, "dist")
  }
};
