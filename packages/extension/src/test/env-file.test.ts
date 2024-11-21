import './setup';
import { expect, test, vi, beforeEach, describe } from 'vitest';
import * as vscode from 'vscode';
import { promises as fsPromises, constants as fsConstants } from 'fs';
import { join } from 'path';
import { checkEnvFileExists, saveEnvFile } from '../utils/env-file';

describe('env-file utilities', () => {
    const mockWorkspaceFolder = {
        uri: vscode.Uri.file('/workspace'),
        name: 'workspace',
        index: 0
    };

    describe('checkEnvFileExists', () => {
        test('throws error when no workspace folder is open', async () => {
            vi.mocked(vscode.workspace).workspaceFolders = undefined;
            await expect(checkEnvFileExists()).rejects.toThrow('No workspace folder is open');
        });

        describe('with workspace folder', () => {
            beforeEach(() => {
                vi.mocked(vscode.workspace).workspaceFolders = [mockWorkspaceFolder];
                vi.mocked(join).mockReturnValue('/workspace/.env');
            });

            test('returns true when .env file exists', async () => {
                vi.mocked(fsPromises.access).mockResolvedValue(undefined);

                const result = await checkEnvFileExists();
                expect(result).toBe(true);
                expect(fsPromises.access).toHaveBeenCalledWith('/workspace/.env', fsConstants.F_OK);
            });

            test('returns false when .env file does not exist', async () => {
                vi.mocked(fsPromises.access).mockRejectedValue(new Error('ENOENT'));

                const result = await checkEnvFileExists();
                expect(result).toBe(false);
                expect(fsPromises.access).toHaveBeenCalledWith('/workspace/.env', fsConstants.F_OK);
            });

            test('throws error for permission denied', async () => {
                vi.mocked(fsPromises.access).mockRejectedValue(new Error('EPERM'));

                await expect(checkEnvFileExists()).rejects.toThrow('EPERM');
                expect(fsPromises.access).toHaveBeenCalledWith('/workspace/.env', fsConstants.F_OK);
            });

            test('throws error for other filesystem errors', async () => {
                vi.mocked(fsPromises.access).mockRejectedValue(new Error('UNKNOWN'));

                const result = await checkEnvFileExists();
                expect(result).toBe(false);
                expect(fsPromises.access).toHaveBeenCalledWith('/workspace/.env', fsConstants.F_OK);
            });
        });
    });

    describe('saveEnvFile', () => {
        test('throws error when no workspace folder is open', async () => {
            vi.mocked(vscode.workspace).workspaceFolders = undefined;
            await expect(saveEnvFile('content')).rejects.toThrow('No workspace folder is open');
        });

        describe('with workspace folder', () => {
            beforeEach(() => {
                vi.mocked(vscode.workspace).workspaceFolders = [mockWorkspaceFolder];
                vi.mocked(join).mockReturnValue('/workspace/.env');
            });

            test('successfully saves content', async () => {
                vi.mocked(vscode.workspace.fs.writeFile).mockResolvedValue(undefined);

                await expect(saveEnvFile('test=value')).resolves.toBeUndefined();
                expect(vscode.workspace.fs.writeFile).toHaveBeenCalledWith(
                    expect.objectContaining({
                        scheme: 'file',
                        fsPath: '/workspace/.env'
                    }),
                    expect.any(Uint8Array)
                );
            });

            test('throws error when write fails', async () => {
                vi.mocked(vscode.workspace.fs.writeFile).mockRejectedValue(new Error('Write failed'));

                await expect(saveEnvFile('test=value')).rejects.toThrow('Failed to save .env file: Write failed');
                expect(vscode.workspace.fs.writeFile).toHaveBeenCalledWith(
                    expect.objectContaining({
                        scheme: 'file',
                        fsPath: '/workspace/.env'
                    }),
                    expect.any(Uint8Array)
                );
            });

            test('throws error for unknown errors', async () => {
                vi.mocked(vscode.workspace.fs.writeFile).mockRejectedValue('Unknown error');

                await expect(saveEnvFile('test=value')).rejects.toThrow('Failed to save .env file: Unknown error');
            });
        });
    });
});
