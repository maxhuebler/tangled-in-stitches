module.exports = {
  plugins: [
    'tailwindcss',
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./pages/**/*.jsx', './components/**/*.jsx'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    'postcss-preset-env',
  ],
}