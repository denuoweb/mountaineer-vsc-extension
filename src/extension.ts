import * as vscode from 'vscode';
import { createControllerFile, createViewFile, registerControllerInAppPy } from './utils/Utils';
import path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.workspace.onDidCreateFiles(async event => {
        const workspaceFolderPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';

        for (const file of event.files) {
            const filePath = file.fsPath;

            if (filePath.includes('/controllers/') && filePath.endsWith('.py')) {
                const controllerName = path.basename(filePath, '.py');

                await createViewFile(controllerName, workspaceFolderPath);
                await createControllerFile(controllerName, workspaceFolderPath);

                await registerControllerInAppPy(controllerName, workspaceFolderPath);
            } 
            else if (filePath.includes('/views/src/app/') && filePath.endsWith('.tsx')) {
                const viewName = filePath.split('/views/src/app/')[1].split('/')[0];
                
                await createControllerFile(viewName, workspaceFolderPath);
                await createViewFile(viewName, workspaceFolderPath);

                await registerControllerInAppPy(viewName, workspaceFolderPath);
            }
        }
    }));
}

export function deactivate() {}
