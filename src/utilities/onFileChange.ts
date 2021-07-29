import path = require('path');
import { Uri, workspace } from 'vscode';
import { execCommand } from './execCommand';

const ignores = ['/.', 'git', 'dist', 'lib', 'node_modules', 'temp', 'office-fluid-container'];

function containsIgnore(relativePath: string) {
	for (var index in ignores) {
		if (relativePath.includes(ignores[index])) {
			return true;
		}
	}
	return false;
}

export function onFileChange(uri: Uri) {
	const relativePath = workspace.asRelativePath(uri);
	const relativePathSplits = relativePath.split('/');
	if (
		!(
			relativePath.endsWith('ts') ||
			relativePath.endsWith('tsx') ||
			relativePath.endsWith('jsx') ||
			relativePath.endsWith('js')
		) ||
		containsIgnore(relativePath) ||
		uri.scheme === 'git'
	) {
		return;
	}
	const packagePath = path.join(...relativePathSplits.slice(0, relativePathSplits.indexOf('packages') + 2));
	const cmd: string = `cd ${packagePath} && (npm run build && cd ..\\office-fluid-container && npm run pack) & cd ..\\..`;
	execCommand(cmd, cmd).then(
		(stdout) => {
			console.log(stdout);
		},
		(stderr) => {
			console.log(stderr);
		}
	);
}
