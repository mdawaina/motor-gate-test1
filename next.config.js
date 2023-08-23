/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    // scrollRestoration: true,
    // scriptLoader: true,
    // sprFlushToDisk: true,
    workerThreads: true,
    appDir: true,
    // basePath: true,
    // reactMode: true,
    // swcLoader: true,
    // swcMinify: true,
    // swcPolyfill: true,
    // swcWorkerLoader: true,
    // swcWorkerMinify: true,
    // swcWorkerPolyfill: true,
    // swcWorkerThreads: true,
    // swcMinifySyntax: true,
    // swcMinifyWhitespace: true,
    // swcMinifyIdentifiers: true,
    // swcMinifyEcmascript: true,
    // swcMinifyCompress: true,
    // swcMinifyMangle: true,
    // swcMinifyToplevel: true,
    // swcMinifyDeadcode: true,
    // swcMinifyEvaluate: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
