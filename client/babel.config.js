module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            api: './src/api',
            components: './src/components/',
            hooks: './src/hooks/',
            screens: './src/screens/',
            utils: './src/utils/',
            contexts: './src/contexts/',
            types: './src/types',
          },
        },
      ],
    ],
  };
};
