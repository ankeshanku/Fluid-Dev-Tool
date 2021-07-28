import * as shell from 'shelljs';

export function execCommand(cmd: string, pwd?: string) {
	var pwdCmd: string = cmd;
	if (pwd) {
		pwdCmd = `cd ${pwd} && cmd`;
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
