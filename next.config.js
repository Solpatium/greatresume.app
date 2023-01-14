const nextTranslate = require('next-translate')

// const withTM = require("next-transpile-modules")([
//   "pdfjs-dist"
// ]);

module.exports = nextTranslate({
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: () => [
    {source: "/creator", destination: "/creator/templates", permanent: true}
  ],
});