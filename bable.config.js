module.exports = {
  presets: [
    [
      '@babel/presets-env',
      { useBuiltIns: 'usage', corejs: { version: '3.27', proposals: true } },
    ],
  ],
}
