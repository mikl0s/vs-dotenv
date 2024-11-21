import { vi } from 'vitest';
import type * as vscode from 'vscode';
import { TextEncoder } from 'util';

// Create a partial mock of the VS Code API
const createMockVSCode = () => ({
    workspace: {
        workspaceFolders: undefined as vscode.WorkspaceFolder[] | undefined,
        fs: {
            writeFile: vi.fn().mockResolvedValue(undefined)
        }
    },
    window: {
        createStatusBarItem: vi.fn().mockReturnValue({
            dispose: vi.fn(),
            hide: vi.fn(),
            show: vi.fn()
        }),
        showInformationMessage: vi.fn(),
        showErrorMessage: vi.fn()
    },
    StatusBarAlignment: {
        Right: 1
    },
    commands: {
        registerCommand: vi.fn().mockReturnValue({
            dispose: vi.fn()
        })
    },
    Uri: {
        file: (path: string) => ({
            scheme: 'file',
            fsPath: path,
            path: path.replace(/\\/g, '/'),
            with: vi.fn().mockImplementation(function(this: any, change: any) {
                return { ...this, ...change };
            })
        })
    },
    ExtensionMode: {
        Test: 1
    }
});

// Mock VS Code API
vi.mock('vscode', () => createMockVSCode());

// Mock fs module
vi.mock('fs', () => ({
    promises: {
        access: vi.fn()
    },
    constants: {
        F_OK: 0
    }
}));

// Mock path module
vi.mock('path', () => ({
    join: vi.fn()
}));

// Ensure TextEncoder is available
if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}

// Reset all mocks before each test
beforeEach(() => {
    vi.clearAllMocks();
});
