// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createFluidComponent } from './createComponent';
import * as shell from 'shelljs';
import { onFileChange } from './utilities/onFileChange';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "FluidDev" is now active!');

	const rootFolderPattern: vscode.GlobPattern = '**/office-bohemia/**/*';

	const watcher = vscode.workspace.createFileSystemWatcher(rootFolderPattern, false, false, false);
	const changeEventDisposable = watcher.onDidChange(onFileChange);
	const createEventDisposable = watcher.onDidCreate(onFileChange);
	const deleteEventDisposable = watcher.onDidDelete(onFileChange);
	context.subscriptions.push(changeEventDisposable, createEventDisposable, deleteEventDisposable);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('FluidDev.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Fluid Dev Tools!');
	});

	context.subscriptions.push(disposable);

	let createComponentDisposable = vscode.commands.registerCommand('FluidDev.createComponent', () => {
		createFluidComponent();
	});

	context.subscriptions.push(createComponentDisposable);

	let disposable2 = vscode.commands.registerCommand('FluidDev.runApp', () => {
		let mainFolderPath: string | undefined = vscode.workspace.rootPath;

		// Will run tasks demoApp in case there's any error
		let packageCurrent: string = 'tasks';
		if (mainFolderPath) {
			let fullPath = vscode.window.activeTextEditor?.document.uri.path;
			if (fullPath) {
				let relativePath = vscode.workspace.asRelativePath(fullPath);
				const arr = relativePath?.split('packages');
				const arr2 = arr[1].split('/');
				packageCurrent = arr2[1];
			}
		}

		shell.cd();
		let path = './office-bohemia/packages/' + packageCurrent + '/src/demoApp';
		shell.cd(path);
		console.log(shell.pwd());

		shell.exec('npm start', function (code, stdout, stderr) {
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program stderr:', stderr);
		});
	});

	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
