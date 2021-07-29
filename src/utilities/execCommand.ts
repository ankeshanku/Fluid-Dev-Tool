import { ChildProcess } from 'child_process';
import * as shell from 'shelljs';
import { EventEmitter } from 'stream';
import { workspace, window } from 'vscode';

class CommandHandler extends EventEmitter {
	private isCommandRunning: boolean = false;
	private childProcesses?: ChildProcess[] = [];

	static instance: CommandHandler = new CommandHandler();

	public execCommand(msg: string, cmd: string, pwd?: string, setBusy?: boolean) {
		if (!pwd) {
			pwd = workspace.rootPath;
		}
		if (this.isCommandRunning) {
			window.showInformationMessage('Some command already running');
			return Promise.reject('CommandHandler busy');
		}
		window.showInformationMessage(msg);
		return new Promise<string>((resolve, reject) => {
			if (setBusy) {
				this.isCommandRunning = true;
				this.emit('busyStatusChange');
			}
			shell.cd();
			shell.cd(pwd);
			const childProcess = shell.exec(cmd, (exitCode, stdout, stderr) => {
				if (setBusy) {
					this.isCommandRunning = false;
					this.emit('busyStatusChange');
				}
				if (exitCode !== 0) {
					return reject(stderr);
				}
				return resolve(stdout);
			});
			this.childProcesses?.push(childProcess);
		});
	}

	public killChild(childProcess: ChildProcess) {
		childProcess.kill();
	}

	public getLastChild(): ChildProcess | undefined {
		if (this.childProcesses && this.childProcesses.length >= 1) {
			return this.childProcesses[this.childProcesses.length - 1];
		}
		return undefined;
	}

	public get isBusy() {
		return this.isCommandRunning;
	}
}

export const commandHandlerInstance: CommandHandler = CommandHandler.instance;
