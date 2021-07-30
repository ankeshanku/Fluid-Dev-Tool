// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ChildProcess } from 'child_process';
import { assert } from 'console';
import path = require('path');
import * as vscode from 'vscode';
import { createFluidComponent } from './createComponent';
import { runAppCommand } from './runDemoApp';
import { commandHandlerInstance, onFileChange } from './utilities';

export function activate(context: vscode.ExtensionContext) {
	let isDemoAppRunning: boolean = false;
	let isDemoHostRunning: boolean = false;
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

	//#region Buttons
	let hotRestartButton = new StatusBarFunctions('Rebuild', 'FluidDev.hotRestart');

	const demoAppTitle = '$(play) Run Demo App';
	let demoAppButton = new StatusBarFunctions(demoAppTitle, 'FluidDev.runDemoApp', 'Stop', false);

	const demoHostTitle = '$(play) Run Demo Host';
	let demoHostButton = new StatusBarFunctions(demoHostTitle, 'FluidDev.runDemoHost', 'Stop', false);

	//#endregion

	let restartDisposable = vscode.commands.registerCommand('FluidDev.hotRestart', () => {
		// statusbarFn.update();
		let mainFolderPath: string | undefined = vscode.workspace.rootPath;
		commandHandlerInstance.execCommand('Rush update is running', 'rush update', mainFolderPath, true).then((_) => {
			commandHandlerInstance
				.execCommand('Rush build is running', 'rush build', mainFolderPath, true)
				.then((_) => {
					console.log('Done');
					vscode.window.showInformationMessage('Rush update and build completed');
				});
		});
	});

	let demoAppProcess: ChildProcess | undefined;
	let runDemoAppDisposable = vscode.commands.registerCommand('FluidDev.runDemoApp', () => {
		if (isDemoAppRunning) {
			demoAppButton.setAvailable();
			commandHandlerInstance.killChild(demoAppProcess!);
		} else {
			demoAppButton.setBusy();
			demoAppProcess = runAppCommand();
		}
		isDemoAppRunning = !isDemoAppRunning;
	});

	let demoHostProcess: ChildProcess | undefined;
	const runDemoHostDisposable = vscode.commands.registerCommand('FluidDev.runDemoHost', () => {
		if (!isDemoHostRunning) {
			demoHostButton.setBusy();
			const mainFolderPath: string | undefined = vscode.workspace.rootPath;
			if (mainFolderPath === undefined) {
				return;
			}
			const demoHostPath: string | undefined = path.join(...[mainFolderPath, 'apps', 'demo-host']);
			commandHandlerInstance.execCommand('Demo host starting...', 'npm run start', demoHostPath, false);
			demoHostProcess = commandHandlerInstance.getLastChild();
		} else {
			demoHostButton.setAvailable();
			commandHandlerInstance.killChild(demoHostProcess!);
		}
		isDemoHostRunning = !isDemoHostRunning;
	});

	context.subscriptions.push(hotRestartButton);
	context.subscriptions.push(demoAppButton);
	context.subscriptions.push(restartDisposable);
	context.subscriptions.push(runDemoHostDisposable);
	context.subscriptions.push(createComponentDisposable);
	context.subscriptions.push(runDemoAppDisposable);

	commandHandlerInstance.on('busyStatusChange', () => {
		if (commandHandlerInstance.isBusy) {
			hotRestartButton.setBusy();
			demoAppButton.setBusy();
			demoHostButton.setBusy();
			return;
		}
		hotRestartButton.setAvailable();
		demoAppButton.setAvailable();
		demoHostButton.setBusy();
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}

class StatusBarFunctions {
	private statusBarItem: vscode.StatusBarItem;
	private title?: string;
	private cmd?: string;
	private busyTitle: string | undefined;
	clearCmdOnBusy: boolean | undefined = true;

	constructor(title: string, cmd: string, busyTitle?: string, clearCmdOnBusy?: boolean) {
		this.title = title;
		this.busyTitle = busyTitle;
		this.cmd = cmd;
		this.clearCmdOnBusy = clearCmdOnBusy;
		this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 150);
		this.statusBarItem.text = title;
		this.statusBarItem.command = cmd;
		this.statusBarItem.show();
	}

	public setBusy() {
		assert(this.statusBarItem);
		if (this.busyTitle) {
			this.statusBarItem.text = this.busyTitle;
		} else {
			this.statusBarItem.text = 'Busy';
		}
		if (this.clearCmdOnBusy) {
			this.statusBarItem.command = undefined;
		}
	}

	public setAvailable() {
		assert(this.statusBarItem);
		this.statusBarItem.command = this.cmd!;
		this.statusBarItem.text = this.title!;
	}

	dispose() {
		this.statusBarItem.dispose();
	}
}
