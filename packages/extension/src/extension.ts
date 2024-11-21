import * as vscode from 'vscode';
import { checkEnvFileExists } from './utils/env-file';
import { loadConfig } from './utils/config';
import { GistService } from './utils/gist-service';

const UPDATE_ENV_COMMAND = 'vscode-update-env.updateEnv';
export let statusBarItem: vscode.StatusBarItem;

async function handleUpdateEnv() {
    try {
        const envExists = await checkEnvFileExists();
        if (!envExists) {
            // Load config to get gist URL
            const config = loadConfig();
            const gistService = new GistService(config.gistUrl);

            try {
                // Fetch .env content from gist
                const envContent = await gistService.fetchEnvContent();
                
                // Create .env file with fetched content
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                if (!workspaceFolder) {
                    throw new Error('No workspace folder is open');
                }

                const envUri = vscode.Uri.joinPath(workspaceFolder.uri, '.env');
                await vscode.workspace.fs.writeFile(envUri, Buffer.from(envContent, 'utf8'));
                
                await vscode.window.showInformationMessage('.env file created from GitHub Gist');
            } catch (error) {
                if (error instanceof Error) {
                    await vscode.window.showErrorMessage(`Failed to fetch .env from gist: ${error.message}`);
                } else {
                    await vscode.window.showErrorMessage('Failed to fetch .env from gist');
                }
                return;
            }
        } else {
            // TODO: Handle updating existing .env file in future stories
            await vscode.window.showInformationMessage('.env file exists in workspace');
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'No workspace folder is open') {
                await vscode.window.showErrorMessage('Please open a workspace folder first');
            } else if (error.message.includes('ENV_GIST_FALLBACK_URL')) {
                await vscode.window.showErrorMessage('Gist URL not configured. Please set ENV_GIST_FALLBACK_URL in .env file');
            } else {
                console.error('Error handling .env update:', error);
                await vscode.window.showErrorMessage(`Failed to update .env file: ${error.message}`);
            }
        } else {
            console.error('Error handling .env update:', error);
            await vscode.window.showErrorMessage('Failed to update .env file');
        }
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
