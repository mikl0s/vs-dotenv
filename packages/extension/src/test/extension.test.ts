import { expect, test, vi } from 'vitest';
import * as vscode from 'vscode';
import { activate, deactivate } from '../extension';

vi.mock('vscode', () => ({
    window: {
        createStatusBarItem: vi.fn(() => ({
            text: '',
            tooltip: '',
            show: vi.fn(),
            dispose: vi.fn()
        }))
    },
    StatusBarAlignment: {
        Right: 1
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
    expect(context.subscriptions.length).toBe(1);
});

test('deactivate disposes status bar item', () => {
    const context = new vscode.ExtensionContext();
    activate(context);
    
    const statusBarItem = context.subscriptions[0];
    deactivate();
    
    expect(statusBarItem.dispose).toHaveBeenCalled();
});
