import { vi } from 'vitest';

// Mock vscode module for tests
const vscode = {
    window: {
        createStatusBarItem: vi.fn(),
        showInformationMessage: vi.fn(),
        showErrorMessage: vi.fn()
    },
    StatusBarAlignment: {
        Right: 1
    },
    commands: {
        registerCommand: vi.fn(() => ({
            dispose: vi.fn()
        }))
    },
    workspace: {
        workspaceFolders: undefined
    },
    Uri: {
        file: (filePath: string) => {
            const uri = {
                scheme: 'file',
                authority: '',
                path: filePath,
                query: '',
                fragment: '',
                fsPath: filePath,
                with: function() { return uri; },
                toJSON: function() { return uri; }
            };
            return uri;
        }
    },
    ExtensionMode: {
        Test: 1
    }
};

export default vscode;
export const window = vscode.window;
export const StatusBarAlignment = vscode.StatusBarAlignment;
export const commands = vscode.commands;
export const workspace = vscode.workspace;
export const Uri = vscode.Uri;
export const ExtensionMode = vscode.ExtensionMode;
