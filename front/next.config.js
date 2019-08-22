module.exports = {
    distDir: '.next',
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        console.log(config);
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval', // hidden-source-map : 소스코드 숨기면서 에러시 소스맵제공 eval: 빠르게 웹팩 적용
        }
    }
};