import * as vscode from 'vscode';

const UPDATE_ENV_COMMAND = 'vscode-update-env.updateEnv';
let statusBarItem: vscode.StatusBarItem;

async function handleUpdateEnv() {
    try {
        await vscode.window.showInformationMessage('Updating .env file...');
        // TODO: Implement actual .env update logic in future stories
    } catch (error) {
        console.error('Error updating .env file:', error);
        await vscode.window.showErrorMessage('Failed to update .env file');
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "vscode-update-env" is now active!');
    
    // Register command
    const commandHandler = vscode.commands.registerCommand(UPDATE_ENV_COMMAND, handleUpdateEnv);
    context.subscriptions.push(commandHandler);
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
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
