const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// treeshaking 예시
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = withBundleAnalyzer({
    distDir: '.next',
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
        },
        browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
        }
    },
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [ // 트리쉐이킹 예시
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/^\.\/ko$/),
        ];
        if(prod) {
            plugins.push(new CompressionPlugin()); // main.js.gz
        }
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval', // hidden-source-map : 소스코드 숨기면서 에러시 소스맵제공 eval: 빠르게 웹팩 적용
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        loader: 'webpack-ant-icon-loader',
                        enforce: 'pre',
                        include: [
                            require.resolve('@ant-design/icons/lib/dist'),

                        ],
                    },
                ]
            },
            plugins
        };
    },
});