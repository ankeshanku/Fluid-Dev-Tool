import * as vscode from 'vscode';
import { commandHandlerInstance } from '../utilities';
import path = require('path');

export const runAppCommand = () => {
	let mainFolderPath: string | undefined = vscode.workspace.rootPath;
	let pwd: string;
	let fullPath = vscode.window.activeTextEditor?.document.uri.path;
	if (fullPath && fullPath.includes('packages')) {
		let fullPathSplits = fullPath.split('/');
		pwd = path.join(...fullPathSplits.slice(0, fullPathSplits.indexOf('packages') + 2));

		vscode.env.openExternal(vscode.Uri.parse('http://localhost:9000'));
		const startCmd = 'npm run start';
		commandHandlerInstance.execCommand('Demo App starting...', startCmd, pwd, false).then(
			(stdout) => {
				console.log(stdout);
			},
			(stderr) => {
				console.log(stderr);
			}
		);
		return commandHandlerInstance.getLastChild();
	} else {
		vscode.window.showInformationMessage('No demoApp found!');
	}
};
