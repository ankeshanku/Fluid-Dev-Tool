// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createFluidComponent } from './createComponent';
import { onFileChange } from './utilities/onFileChange';
import { runAppCommand } from './runDemoApp';
import { execCommand } from './utilities';

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
		vscode.window.showInformationMessage('Hello World from Fluid Dev Tools!');
	});

	context.subscriptions.push(disposable);

	let createComponentDisposable = vscode.commands.registerCommand('FluidDev.createComponent', () => {
		createFluidComponent();
	});

	context.subscriptions.push(createComponentDisposable);

	let runDemoAppDisposable = vscode.commands.registerCommand('FluidDev.runApp', () => {
		runAppCommand();
	});

	context.subscriptions.push(runDemoAppDisposable);

	let statusbarFn = new StatusBarFunctions();
	statusbarFn.update('Restart');

	let restartDisposable = vscode.commands.registerCommand('FluidDev.hotRestart', () => {
		// statusbarFn.update();
		let mainFolderPath: string | undefined = vscode.workspace.rootPath;
		execCommand('Rush update is running', 'rush update', mainFolderPath).then((_) => {
			execCommand('Rush build is running', 'rush build', mainFolderPath).then((_) => {
				console.log('Done');
				vscode.window.showInformationMessage('Rush update and build completed');
			});
		});
	});

	context.subscriptions.push(statusbarFn);
	context.subscriptions.push(restartDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class StatusBarFunctions {
	private _hotRestartItem!: vscode.StatusBarItem;

	public update(str: string) {
		if (!this._hotRestartItem) {
			this._hotRestartItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 150);
		}
		this._hotRestartItem.text = str;
		this._hotRestartItem.command = 'FluidDev.hotRestart';
		this._hotRestartItem.show();
	}

	dispose() {
		this._hotRestartItem.dispose();
	}
}
