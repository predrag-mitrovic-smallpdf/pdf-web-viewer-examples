import shell from 'shelljs';

if (!shell.which('yarn')) throw new Error('Yarn not found. Yarn is required for this script to run.');

const version = process.argv[2];

if (!version) throw new Error('Please provide new version as first argument.');

shell.sed('-i', 'tree/.*/', `tree/${version}/`, 'README.md');

const exampleDirectoryNames = shell.ls("-d", "example-*");

exampleDirectoryNames.forEach((exampleDirectoryName) => {
    shell.cd(exampleDirectoryName);
    shell.exec(`yarn upgrade @pdf-tools/four-heights-pdf-web-viewer@${version}`);
    shell.cd('..');
});