module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
      },
    ]
  ],
  plugins: [
    [
      'transform-imports',
      {
        './src/common/api-urls': {
          'transform': '../api-urls/${member}.js',
          'preventFullImport': true,
        },
        './src/common/constants': {
          'transform': '../constants/${member}.js',
          'preventFullImport': true,
        },
        './src/common/': {
          'transform': '../types/${member}.js',
          'preventFullImport': true,
        },
        './src': {
          'transform': './src/${member}.js',
          'preventFullImport': true,
        },
      },
    ],
    [ 'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@shared': './src/common',
          '@': './src',
        }
      }
    ]
  ],
  env: {
    production: {
      presets: [
        ['@babel/preset-env', {
          targets: 'defaults',
          modules: 'commonjs'
        }],
      ],
    },
  },
};
