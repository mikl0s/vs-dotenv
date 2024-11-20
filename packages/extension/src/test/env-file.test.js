import './setup';
import { expect, test, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { checkEnvFileExists } from '../utils/env-file';
vi.mock('fs');
vi.mock('path');
describe('env-file utilities', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(vscode.workspace).workspaceFolders = undefined;
    });
    test('throws error when no workspace folder is open', async () => {
        await expect(checkEnvFileExists()).rejects.toThrow('No workspace folder is open');
    });
    test('returns true when .env file exists', async () => {
        vi.mocked(vscode.workspace).workspaceFolders = [{
                uri: { fsPath: '/workspace' },
                name: 'workspace',
                index: 0
            }];
        vi.mocked(path.join).mockReturnValue('/workspace/.env');
        vi.mocked(fs.promises.access).mockResolvedValue(undefined);
        const result = await checkEnvFileExists();
        expect(result).toBe(true);
        expect(fs.promises.access).toHaveBeenCalledWith('/workspace/.env', fs.constants.F_OK);
    });
    test('returns false when .env file does not exist', async () => {
        vi.mocked(vscode.workspace).workspaceFolders = [{
                uri: { fsPath: '/workspace' },
                name: 'workspace',
                index: 0
            }];
        vi.mocked(path.join).mockReturnValue('/workspace/.env');
        vi.mocked(fs.promises.access).mockRejectedValue(new Error('ENOENT'));
        const result = await checkEnvFileExists();
        expect(result).toBe(false);
    });
    test('throws error for unexpected file system errors', async () => {
        vi.mocked(vscode.workspace).workspaceFolders = [{
                uri: { fsPath: '/workspace' },
                name: 'workspace',
                index: 0
            }];
        vi.mocked(path.join).mockReturnValue('/workspace/.env');
        vi.mocked(fs.promises.access).mockRejectedValue(new Error('EPERM'));
        await expect(checkEnvFileExists()).rejects.toThrow('EPERM');
    });
});
//# sourceMappingURL=env-file.test.js.map