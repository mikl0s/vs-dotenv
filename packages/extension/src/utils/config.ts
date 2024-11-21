import * as dotenv from 'dotenv';
import * as path from 'path';
import * as vscode from 'vscode';

export interface Config {
    gistUrl: string;
}

export function loadConfig(): Config {
    // Load .env file from workspace root
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder found');
    }

    const envPath = path.join(workspaceFolder.uri.fsPath, '.env');
    const result = dotenv.config({ path: envPath });

    if (result.error) {
        throw new Error(`Error loading .env file: ${result.error.message}`);
    }

    const gistUrl = process.env.ENV_GIST_FALLBACK_URL;
    if (!gistUrl || gistUrl.trim() === '') {
        throw new Error('ENV_GIST_FALLBACK_URL not found in .env file');
    }

    return {
        gistUrl
    };
}
