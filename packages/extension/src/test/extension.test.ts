import './setup';
import { expect, test, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import { activate, deactivate } from '../extension';

vi.mock('vscode');

describe('Extension', () => {
    let mockContext: vscode.ExtensionContext;
    let mockStatusBarItem: vscode.StatusBarItem;

    beforeEach(() => {
        vi.clearAllMocks();
        mockStatusBarItem = {
            text: '',
            tooltip: '',
            command: '',
            show: vi.fn(),
            dispose: vi.fn(),
            hide: vi.fn(),
            color: undefined,
            backgroundColor: undefined,
            id: 'test-id',
            name: 'test-name',
            priority: 100,
            alignment: vscode.StatusBarAlignment.Right,
            accessibilityInformation: undefined
        } as vscode.StatusBarItem;

        // Mock vscode.window.createStatusBarItem before using it
        vi.mocked(vscode.window).createStatusBarItem = vi.fn().mockReturnValue(mockStatusBarItem);

        mockContext = {
            subscriptions: [],
            extensionUri: {} as vscode.Uri,
            extensionPath: '',
            globalState: {
                get: vi.fn(),
                update: vi.fn(),
                setKeysForSync: vi.fn()
            } as unknown as vscode.Memento & { setKeysForSync(keys: readonly string[]): void },
            globalStoragePath: '',
            globalStorageUri: {} as vscode.Uri,
            logPath: '',
            logUri: {} as vscode.Uri,
            storagePath: '',
            storageUri: {} as vscode.Uri,
            workspaceState: {
                get: vi.fn(),
                update: vi.fn()
            } as unknown as vscode.Memento,
            secrets: {} as vscode.SecretStorage,
            extensionMode: vscode.ExtensionMode.Test,
            environmentVariableCollection: {
                persistent: false,
                replace: vi.fn(),
                append: vi.fn(),
                prepend: vi.fn(),
                get: vi.fn(),
                forEach: vi.fn(),
                delete: vi.fn(),
                clear: vi.fn(),
                getScoped: vi.fn()
            } as unknown as vscode.GlobalEnvironmentVariableCollection,
            asAbsolutePath: (relativePath: string) => relativePath,
            extension: {} as vscode.Extension<unknown>,
            languageModelAccessInformation: {} as vscode.LanguageModelAccessInformation
        } as vscode.ExtensionContext;
    });

    test('activate creates status bar item', async () => {
        await activate(mockContext);
        expect(vscode.window.createStatusBarItem).toHaveBeenCalledWith(
            vscode.StatusBarAlignment.Right,
            100
        );
        expect(mockStatusBarItem.text).toBe('Update .env');
        expect(mockStatusBarItem.tooltip).toBe('Click to update .env file from GitHub Gist');
        expect(mockStatusBarItem.command).toBe('vscode-update-env.updateEnv');
        expect(mockStatusBarItem.show).toHaveBeenCalled();
    });

    test('activate registers command', async () => {
        await activate(mockContext);
        expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
            'vscode-update-env.updateEnv',
            expect.any(Function)
        );
    });

    test('deactivate disposes resources', async () => {
        await activate(mockContext);
        deactivate();
        expect(mockStatusBarItem.dispose).toHaveBeenCalled();
    });
});
