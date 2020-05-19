var { readdirSync, existsSync } = require("fs");
var cp = require("child_process");

var outputHandler = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
};

var componentIncrement = 0;

var compileComponent = (components) => {
  const buildJsFiles = `ng build --extra-webpack-config webpack.externals.js --single-bundle --prod --main='src/components/${components[componentIncrement]}/compile.ts'`;
  const copyBundledComponent = `cp dist/tmp/main-es2015.js dist/components/shared-${components[componentIncrement]}.js`;

  var child = cp.exec(`${buildJsFiles} && ${copyBundledComponent}`, outputHandler);

  child.on('exit', function() {
    console.log(`built ${components[componentIncrement]}...`);
    componentIncrement++;
    if (components.length !== componentIncrement) {
      compileComponent(components);
    } else {
      process.exit();
    }
  })
};

const getDirectories = () => {
  return readdirSync(`${__dirname}/src/components/`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

if (!existsSync('dist')) {
  cp.exec("mkdir dist");

  if (!existsSync('dist/components')) {
    cp.exec("mkdir dist/components");
  }
}

var components = getDirectories();

compileComponent(components);
