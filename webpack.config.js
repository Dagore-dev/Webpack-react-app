const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ruleForReact = {
  test: /\.js$/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic" //classic es el default, con automatic no tenemos que estar importanto react en cada archivo.
        }
      ]
    ]
  }
};

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
}

module.exports = (env, argv) => {

  const { mode } = argv;
  const isProduction = mode === "production";

  return {
    //entry: "./src/index.js",
    output: {
      filename: isProduction 
        ? "[name].[contenthash].js"
        : "main.js",
      path: path.resolve(__dirname, "build")//__dirname es la ruta absoluta de la raíz del proyecto, dentro de la cual emplearemos la carpeta build. 
    },
  
    module: {//todo esto es configuración de Babel, hay que instalar @babel/core babel-loader @babel/preset-react como dev-dependencies
      rules: [ruleForReact, ruleForStyles]
    },
  
    plugins: [//agregan funcionalidad a webpack, como inyectar el script al html automáticamente al hacer la build.
      new HtmlWebpackPlugin({ template: "src/index.html" })
    ],
  
    devServer: {//configuración de webpack-dev-server, por algun motivo la propiedad overlay dice que no existe: es pa mostrar errore en navegador
      open: true,//nos abre el navegador
      port: 3000,
      compress: true
    },
  
    devtool: "source-map"//crea un archivo paralelo al de la build para encontrar los errores del desarrollo facilmente
  }
} 