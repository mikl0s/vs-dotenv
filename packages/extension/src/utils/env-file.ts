import * as vscode from 'vscode';
import { promises as fsPromises, constants as fsConstants } from 'fs';
import { join } from 'path';
import { TextEncoder } from 'util';

/**
 * Check if a .env file exists in the current workspace
 * @returns Promise<boolean> true if .env exists, false otherwise
 * @throws Error if no workspace folder is open or if access is denied
 */
export async function checkEnvFileExists(): Promise<boolean> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder is open');
    }

    const envPath = join(workspaceFolder.uri.fsPath, '.env');
    try {
        await fsPromises.access(envPath, fsConstants.F_OK);
        return true;
    } catch (error) {
        if (error instanceof Error && error.message.includes('EPERM')) {
            throw error;
        }
        return false;
    }
}

/**
 * Save content to a .env file in the current workspace
 * @param content The content to write to the .env file
 * @returns Promise<void>
 * @throws Error if no workspace folder is open or if writing fails
 */
export async function saveEnvFile(content: string): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder is open');
    }

    try {
        const envPath = join(workspaceFolder.uri.fsPath, '.env');
        const encoder = new TextEncoder();
        await vscode.workspace.fs.writeFile(
            vscode.Uri.file(envPath),
            encoder.encode(content)
        );
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save .env file: ${error.message}`);
        }
        throw new Error(`Failed to save .env file: ${error}`);
    }
}
