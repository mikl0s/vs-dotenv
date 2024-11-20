import * as vscode from 'vscode';
import { checkEnvFileExists } from './utils/env-file';
const UPDATE_ENV_COMMAND = 'vscode-update-env.updateEnv';
export let statusBarItem;
async function handleUpdateEnv() {
    try {
        const envExists = await checkEnvFileExists();
        if (envExists) {
            await vscode.window.showInformationMessage('.env file exists in workspace');
        }
        else {
            await vscode.window.showInformationMessage('No .env file found in workspace');
        }
        // TODO: Implement actual .env update logic in future stories
    }
    catch (error) {
        if (error instanceof Error && error.message === 'No workspace folder is open') {
            await vscode.window.showErrorMessage('Please open a workspace folder first');
        }
        else {
            console.error('Error checking .env file:', error);
            await vscode.window.showErrorMessage('Failed to check .env file');
        }
    }
}
export function activate(context) {
    console.log('Extension "vscode-update-env" is now active!');
    // Register command
    const commandHandler = vscode.commands.registerCommand(UPDATE_ENV_COMMAND, handleUpdateEnv);
    context.subscriptions.push(commandHandler);
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "Update .env";
    statusBarItem.tooltip = "Click to update .env file from GitHub Gist";
    statusBarItem.command = UPDATE_ENV_COMMAND;
    statusBarItem.show();
    // Add to subscriptions for proper disposal
    context.subscriptions.push(statusBarItem);
}
export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
//# sourceMappingURL=extension.js.map