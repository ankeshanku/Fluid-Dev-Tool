import * as shell from 'shelljs';
import { writeFile } from 'fs';
import { fileMap } from './starterComponent.js';
import * as vscode from 'vscode';
import { assert } from 'console';

function createFolder(packageRoot: string, packageAlias: string) {
	shell.mkdir(`${packageRoot}${packageAlias}`);
	shell.mkdir(`${packageRoot}${packageAlias}/build`);
	shell.mkdir(`${packageRoot}${packageAlias}/src`);
	shell.mkdir(`${packageRoot}${packageAlias}/src/component`);
	shell.mkdir(`${packageRoot}${packageAlias}/src/demoApp`);
	shell.mkdir(`${packageRoot}${packageAlias}/src/demoAppTinylicious`);
}

function cpFiles(packageRoot: string, packageName: string, packageAliasPascal: string, packageAliasSnake: string) {
	fileMap.forEach((file) => {
		const formattedFileLocation = file.location
			.replace(/\$PACKAGE_NAME\$/g, packageName)
			.replace(/\$PACKAGE_ALIAS_PASCAL\$/g, packageAliasPascal)
			.replace(/\$PACKAGE_ALIAS_SNAKE\$/g, packageAliasSnake);
		const formattedContent = file.content
			.replace(/\$PACKAGE_NAME\$/g, packageName)
			.replace(/\$PACKAGE_ALIAS_PASCAL\$/g, packageAliasPascal)
			.replace(/\$PACKAGE_ALIAS_SNAKE\$/g, packageAliasSnake);
		const fileLocation = `${packageRoot}${packageAliasSnake}/${formattedFileLocation}`;
		writeFile(fileLocation, formattedContent, () => {});
	});
}

async function askQuestions() {
	const askPackageName: vscode.InputBoxOptions = {
		title: 'Package name',
		placeHolder: 'Example: (Task List)'
	};
	const packageName = await vscode.window.showInputBox(askPackageName);

	return { packageName };
}

const pascalize = (str: string) => {
	return str
		.replace(/(?:^\w|\[A-Z\]|\b\w)/g, (word, _index) => {
			return word.toUpperCase();
		})
		.replace(/\s+/g, '');
};

const snaky = (str: string) => {
	if (str === null) {
		return '';
	}
	return str!
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		?.map((s) => s.toLowerCase())
		.join('_');
};

export const createFluidComponent = async () => {
	const answers = await askQuestions();
	const { packageName } = answers;
	try {
		var packageRoot: string | undefined = vscode.workspace.rootPath;
		assert(packageRoot !== null && packageName !== null, 'Open a package first!');

		const packageAliasPascal = pascalize(packageName!);
		const packageAliasSnake = snaky(packageName!)!;
		packageRoot += '\\packages\\';

		createFolder(packageRoot!, packageAliasSnake);
		cpFiles(packageRoot!, packageName!, packageAliasPascal, packageAliasSnake);
	} catch (error) {
		vscode.window.showErrorMessage('Invalid package name');
		return;
	}
};
