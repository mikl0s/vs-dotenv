import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Check if a .env file exists in the current workspace
 * @returns Promise<boolean> true if .env exists, false otherwise
 * @throws Error if no workspace folder is open
 */
export async function checkEnvFileExists(): Promise<boolean> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder is open');
    }

    const envPath = path.join(workspaceFolder.uri.fsPath, '.env');
    try {
        await fs.promises.access(envPath, fs.constants.F_OK);
        return true;
    } catch (error) {
        if (error instanceof Error && error.message.includes('EPERM')) {
            throw error;
        }
        return false;
    }
}
