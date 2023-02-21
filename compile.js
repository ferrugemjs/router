const fs = require("fs");
const fjsparse = require("@ferrugemjs/compile/parse/parse");

const compile = (replaceFrom, replaceTo) => (filePath) => {
    // const filePath = "test/app/main-app.html";
    fs.readFile(filePath, function (err, buf) {
        const compiledStr = fjsparse.default(buf.toString(), {
            templateExtension: ".html",
            viewModel: "main-app",
            env: "production" // default is "development"
        });
        fs.writeFile(`${filePath.replace(replaceFrom, replaceTo)}.js`, compiledStr, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
}

const build = (dirname, replaceFrom, replaceTo) => {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames
            .map(filename => `${dirname}/${filename}`)
            .filter(filaPath => filaPath.match(/.html$/gm))
            .forEach(compile(replaceFrom, replaceTo));
    });

}

build('src/router', 'src', 'dist/src');

build('test/apps', 'apps', 'build');

build('test', '', '');
