import * as shell from 'shelljs';
import { workspace, window } from 'vscode';

export function execCommand(msg: string, cmd: string, pwd?: string) {
	if (!pwd) {
		pwd = workspace.rootPath;
	}
	window.showInformationMessage(msg);
	return new Promise<string>((resolve, reject) => {
		shell.cd();
		shell.cd(pwd);
		shell.exec(cmd, (exitCode, stdout, stderr) => {
			if (exitCode !== 0) {
				return reject(stderr);
			}
			return resolve(stdout);
		});
	});
}
