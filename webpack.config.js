const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === "production" ?  "/weather/" : "/",
        environment: {
            arrowFunction: false,
        },
        clean: true,
    },
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "404.html"
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/images",
                    to: path.resolve(__dirname, "dist/images"),
                },
                {
                    from: "src/font",
                    to: path.resolve(__dirname, "dist/font"),
                },
                {
                    from: "src/sw.js",
                    to: path.resolve(__dirname, "dist/sw.js"),
                },
                {
                    from: "src/manifest.json",
                    to: path.resolve(__dirname, "dist/manifest.json"),
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {extensions: [".ts", ".js"]},
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
            publicPath: "/city/",
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
};
