
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};
module.exports = {
  webpack: function (config,env) { 
    require('react-app-rewire-postcss')(config, {
       plugins: loader => [
        require('postcss-rtl')()
      ]
    });
    return config
  },
  paths: function(paths, env) {
    paths.appHtml =  resolveApp('resources/js/public/index.html')
    paths.appPublic = resolveApp('resources/js/public')
    paths.appBuild = resolveApp('public'),
    paths.appSrc = resolveApp('resources/js')
    paths.appIndexJs = resolveModule(resolveApp, 'resources/js/index')
    return paths
  }
    //appSrc: resolveApp('src'),
    
  /* dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
    console.log(paths)
    // ...add your paths config
    return paths;
  }, */
  //console.log(config.paths)
  /* config.paths= function(path, env) {
    // ...add your paths config
    console.log(path);
    return path;
  } */
  /* const pathsOverride = override.paths || ((paths, env) => paths);
  config.paths= pathsOverride */
  //return config;
};
