import * as shell from 'shelljs';
import { workspace } from 'vscode';

export function execCommand(cmd: string, pwd?: string) {
	if (!pwd) {
		pwd = workspace.rootPath;
	}
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
