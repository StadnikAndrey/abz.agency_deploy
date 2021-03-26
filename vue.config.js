module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/test-task/'
        : '/'
};