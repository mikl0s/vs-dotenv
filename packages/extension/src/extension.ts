import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "vscode-update-env" is now active!');
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.text = "Update .env";
    statusBarItem.tooltip = "Click to update .env file from GitHub Gist";
    statusBarItem.show();

    // Add to subscriptions for proper disposal
    context.subscriptions.push(statusBarItem);
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
