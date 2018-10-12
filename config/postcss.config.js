module.exports = {
    // parser: 'sugarss',
    plugins: {
/*        postcss: function() {
            return [px2rem({remUnit: 72})];
        },*/
        autoprefixer: {
            browsers: ['last 3 versions','iOS >= 8','Firefox >= 20','Android > 4.2','not ie <= 8']
        }

    }
};
/* browsers: ['> 1%', 'last 2 versions','not ie <= 8'] */
