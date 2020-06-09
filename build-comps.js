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
var env = process.argv[2];
var prodExt = env === "prod" ? " --prod" : "";

var compileComponent = (components) => {
  var buildJsFiles = `ng build --extra-webpack-config webpack.externals.js --single-bundle${prodExt} --main='src/components/${components[componentIncrement]}/compile.ts'`;
  var copyBundledComponent = `cp ${__dirname}/dist/tmp/main-es2015.js ${__dirname}/dist/components/shared-${components[componentIncrement]}.js`;

  var child = cp.exec(`${buildJsFiles} && ${copyBundledComponent}`, outputHandler);

  child.on('exit', function() {
    console.log(`built ${components[componentIncrement]}...`);
    componentIncrement++;
    if (components.length !== componentIncrement) {
      compileComponent(components);
    } else {
      console.log('built all components')
      process.exit();
    }
  })
};

var getDirectories = () => {
  return readdirSync(`${__dirname}/src/components/`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

if (!existsSync(`${__dirname}/dist`)) {
  cp.exec(`mkdir ${__dirname}/dist`);
}
if (!existsSync(`${__dirname}/dist/components`)) {
  cp.exec(`mkdir ${__dirname}/dist/components`);
}

var components = getDirectories();

compileComponent(components);
