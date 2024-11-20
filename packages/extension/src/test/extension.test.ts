import { expect, test, vi } from 'vitest';
import * as vscode from 'vscode';
import { activate, deactivate } from '../extension';

vi.mock('vscode', () => ({
    window: {
        createStatusBarItem: vi.fn(() => ({
            text: '',
            tooltip: '',
            command: '',
            show: vi.fn(),
            dispose: vi.fn()
        })),
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
    ExtensionContext: class {
        subscriptions: any[] = [];
    }
}));

test('activate creates status bar item', () => {
    const context = new vscode.ExtensionContext();
    
    activate(context);
    
    expect(vscode.window.createStatusBarItem).toHaveBeenCalledWith(
        vscode.StatusBarAlignment.Right,
        100
    );
    expect(context.subscriptions.length).toBe(2); // Now includes command registration
});

test('deactivate disposes status bar item', () => {
    const context = new vscode.ExtensionContext();
    activate(context);
    
    const statusBarItem = context.subscriptions[1]; // Status bar is now second subscription
    deactivate();
    
    expect(statusBarItem.dispose).toHaveBeenCalled();
});

test('command is registered during activation', () => {
    const context = new vscode.ExtensionContext();
    
    activate(context);
    
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'vscode-update-env.updateEnv',
        expect.any(Function)
    );
});

test('command handler shows info message', async () => {
    const context = new vscode.ExtensionContext();
    activate(context);
    
    // Get the command handler function
    const commandHandler = vi.mocked(vscode.commands.registerCommand).mock.calls[0][1];
    
    // Call the handler
    await commandHandler();
    
    expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
        'Updating .env file...'
    );
});
