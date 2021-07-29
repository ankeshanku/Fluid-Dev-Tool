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
			});
		});
    });

    context.subscriptions.push(statusbarFn);
    context.subscriptions.push(restartDisposable);

	// // register a command that is invoked when the status bar item is selected
	// let hotReloadDisposable = vscode.commands.registerCommand('FluidDev.hotReload', () => {
	// 	hotReloadFunction();
	// });
	// // create a new status bar item that we can now manage
	// hotReloadItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	// hotReloadItem.command = 'FluidDev.hotReload';

	// context.subscriptions.push(hotReloadDisposable);
	// context.subscriptions.push(hotReloadItem);

	// let hotRestartDisposable = vscode.commands.registerCommand('FluidDev.hotRestart', () => {
	// 	hotRestartFunction();
	// });
	// // hotRestartItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 150);
	// hotRestartItem.command = 'FluidDev.hotRestart';

	// context.subscriptions.push(hotRestartDisposable);
	// context.subscriptions.push(hotRestartItem);

	// context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(hotRestartFunction));
	// // update status bar item once at start
	// hotRestartFunction();
}

// this method is called when your extension is deactivated
export function deactivate() {}

class StatusBarFunctions {
	private _hotRestartItem!: vscode.StatusBarItem;

	public update(str : string) {

        if (!this._hotRestartItem) {
        	this._hotRestartItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 150);
        }
		this._hotRestartItem.text = str;
		this._hotRestartItem.command = 'FluidDev.hotRestart';
		this._hotRestartItem.show();
    }

    dispose() {
        this._hotRestartItem.dispose();
    }
}