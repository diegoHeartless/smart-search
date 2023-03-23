const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.export = {
    // Other rules...
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
/*    plugins: [
        new NodePolyfillPlugin()
    ],
    resolve: {
        fallback: {
            "fs": require.resolve('fs'),
            "tls": false,
            "net": false,
            "path":  require.resolve('path'),
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
        }
    }*/
}
