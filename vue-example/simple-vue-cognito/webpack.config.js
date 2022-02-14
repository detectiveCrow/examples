const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  mode: "development",
  // 진입 지점 설정
  entry: "./src/main.js",

  // 결과물 반환 설정
  output: {
    // 주석은 기본값으로 `__dirname`은 현재 파일의 위치를 알려주는 NodeJS전역변수
    // path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test : /\.vue$/,
        // use 속성에 loader가 하나면 배열로 안해도 된다!
        use : 'vue-loader'
      },
      {
        test: /\.s?css$/,
        // 순서 중요
        use: [
          'vue-style-loader',
          "style-loader", 
          "css-loader", 
          "postcss-loader", 
          "sass-loader"
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin()
  ],

  // 개발 서버 옵션
  devServer: {
    host: "localhost",
  },

  // root밑에 컴포넌트를 부르기 위해서 반드시 필요!
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
};
