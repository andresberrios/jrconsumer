module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename: "jrconsumer.js"
    },
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    }
};
