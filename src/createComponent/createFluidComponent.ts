import * as shell from 'shelljs';
import { readFile, write, writeFile } from 'fs';
import { fileMap } from './starterComponent';
import * as vscode from 'vscode';
import { assert } from 'console';
import { execCommand } from '../utilities';

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

function addEntryToRushJson(packageRoot: string, packageAliasSnake: string) {
	const entry = {
		packageName: '@fluidx/' + packageAliasSnake,
		projectFolder: 'packages/' + packageAliasSnake,
		shouldPublish: false
	};

	readFile(`${packageRoot}\\rush.json`, 'utf-8', (error, data) => {
		if (error) {
			vscode.window.showErrorMessage('rush.json not found');
			throw error;
		}
		const oldContent = JSON.parse(data);
		oldContent['projects'].push(entry);
		const newContent = JSON.stringify(oldContent);
		writeFile(`${packageRoot}\\rush.json`, newContent, (error) => {
			if (error) {
				vscode.window.showErrorMessage('rush.json not found');
				throw error;
			}
		});
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

function rollback(root: string, packageAlias: string) {
	shell.rm('-r', `${root}\\packages\\${packageAlias}`);
}

function runInitialCommands(root: string) {
	const progressOptions: vscode.ProgressOptions = {
		location: vscode.ProgressLocation.Notification
	};
	vscode.window.withProgress(progressOptions, async (progress, _cancellationToken) => {
		const rushPurge: string = 'rush purge';
		const rushUpdate: string = 'rush update';
		const rushBuild: string = 'rush build';
		try {
			execCommand('Rush purge running', rushPurge, root).then((_) => {
				execCommand('Rush updating' , rushUpdate, root).then((_) => {
					execCommand(rushBuild, root).then((_) => {
						console.log('Done');
					});
				});
			});
		} catch (error) {
			vscode.window.showErrorMessage(`Error: ${error}`);
			console.log('Rejected');
			return Promise.reject();
		}
		return Promise.resolve(true);
	});
}

export const createFluidComponent = async () => {
	const answers = await askQuestions();
	const { packageName } = answers;
	const packageAliasPascal = pascalize(packageName!);
	const packageAliasSnake = snaky(packageName!)!;
	const root: string | undefined = vscode.workspace.rootPath;

	try {
		assert(root !== null && packageName !== null, 'Open a package first!');

		const packageRoot = root + '\\packages\\';

		createFolder(packageRoot!, packageAliasSnake);
		cpFiles(packageRoot!, packageName!, packageAliasPascal, packageAliasSnake);
		addEntryToRushJson(root!, packageAliasSnake);
	} catch (error) {
		vscode.window.showErrorMessage('Error');
		rollback(root!, packageAliasSnake);
		return;
	}

	try {
		runInitialCommands(root!);
	} catch (error) {
		vscode.window.showErrorMessage('Error while running initial rush commands, please run manually');
	}
};
