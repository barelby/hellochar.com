const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "public"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            'three-examples': path.resolve(__dirname, 'node_modules/three/examples/js/')
        }
    }
};
