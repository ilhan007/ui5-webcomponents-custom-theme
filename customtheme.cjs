const less = require('less');
const fs = require('fs');
const path = require('path');

const themeName = process.argv[2] || "mytheme";
const baseThemeName = process.argv[3] || "sap_horizon";

const CUSTOM_THEME_METADATA = `
.sapThemeMetaData-Base-baseLib {
	background-image: url('data:text/plain;utf-8, { "Path": "Base.baseLib.${themeName}.css_variables", "Extends": ["${baseThemeName}","baseTheme"]}');
}`;

async function compileLess(inputFile, outputFile) {
    try {
        const inputFilePath = path.resolve(__dirname, inputFile);
        const outputFilePath = path.resolve(__dirname, outputFile);

        const lessData = await fs.promises.readFile(inputFilePath, 'utf-8');

        const { css } = await less.render(lessData, {
            filename: inputFilePath
        });

		const output = `${CUSTOM_THEME_METADATA} ${css}`;

        await fs.promises.writeFile(outputFilePath, output, {encoding:'utf8',flag:'w'});
        console.log(`Successfully compiled Less file ${inputFile} to CSS file ${outputFile}`);
    } catch (error) {
        console.error('Error compiling Less:', error);
    }
}

compileLess('src/mytheme.less', 'src/customtheme/mytheme.css');