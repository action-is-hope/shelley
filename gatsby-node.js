const StylableWebpackPlugin = require("@stylable/webpack-plugin");

exports.onCreateWebpackConfig = ({ actions, getConfig }, pluginOptions) => {
  const config = getConfig();

  // Exclude .st.css files from CSS loaders.
  for (let i = 0; i < config.module.rules.length; i++) {
    const rule = config.module.rules[i];

    if (rule.oneOf) {
      const handler = rule.oneOf[0];
      const use = handler.use;

      for (let j = 0; j < use.length; j++) {
        const loader = use[j];
        if (!loader.loader.match(/postcss/)) continue;

        rule.exclude = /\.st\.css$/;
        break;
      }
    } else if (rule.test && rule.test.toString().match(/css/)) {
      rule.exclude = /\.st\.css$/;
    }
  }

  // Add the stylable plugin - https://www.npmjs.com/package/@stylable/webpack-plugin
  const options = {
    outputCSS: true,
    // useWeakDeps: true, // Find out what this does...
    experimentalHMR: true, // FYI: Hot Module Reloading.
    optimize: {
      // The following two options need testing in prod.
      classNameOptimizations: false,
      shortNamespaces: false
    },
    ...pluginOptions
  };
  config.plugins.push(new StylableWebpackPlugin(options));

  actions.replaceWebpackConfig(config);
};
