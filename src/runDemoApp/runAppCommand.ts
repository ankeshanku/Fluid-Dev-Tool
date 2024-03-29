import * as vscode from 'vscode';
import * as shell from 'shelljs';

export const runAppCommand = () => {
    let mainFolderPath: string | undefined = vscode.workspace.rootPath;

    // Will run tasks demoApp in case there's any error
    let packageCurrent : string = 'tasks';
    if(mainFolderPath) {
        let fullPath = vscode.window.activeTextEditor?.document.uri.path;
        if(fullPath) {
            let relativePath = vscode.workspace.asRelativePath(fullPath);
            const arr = relativePath?.split('packages');
            const arr2 = arr[1].split('/');
            packageCurrent = arr2[1];
        }
    }

    shell.cd();
    let path = './office-bohemia/packages/' + packageCurrent + '/src/demoApp';
    shell.cd(path);
    vscode.window.showInformationMessage('Running demoApp of your component with npm start');
    shell.exec('npm start', function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
};