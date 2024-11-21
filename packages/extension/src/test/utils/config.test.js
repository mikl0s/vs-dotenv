import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadConfig } from '../../utils/config';
import * as vscode from 'vscode';
import * as dotenv from 'dotenv';
vi.mock('vscode');
vi.mock('dotenv');
describe('Config', () => {
    const mockUri = {
        fsPath: '/test/workspace',
        scheme: 'file',
        authority: '',
        path: '/test/workspace',
        query: '',
        fragment: '',
        with: vi.fn(),
        toJSON: vi.fn()
    };
    const mockWorkspaceFolders = [{
            uri: mockUri,
            name: 'test',
            index: 0
        }];
    beforeEach(() => {
        vi.resetAllMocks();
        process.env = {}; // Reset process.env for each test
        vi.spyOn(vscode.workspace, 'workspaceFolders', 'get').mockReturnValue(mockWorkspaceFolders);
    });
    it('should load config successfully', () => {
        const mockGistUrl = 'https://gist.githubusercontent.com/test/123/.env';
        vi.mocked(dotenv.config).mockReturnValue({ parsed: {} });
        process.env.ENV_GIST_FALLBACK_URL = mockGistUrl;
        const config = loadConfig();
        expect(config.gistUrl).toBe(mockGistUrl);
    });
    it('should throw error when no workspace folder found', () => {
        vi.spyOn(vscode.workspace, 'workspaceFolders', 'get').mockReturnValue(undefined);
        vi.mocked(dotenv.config).mockReturnValue({ parsed: {} });
        expect(() => loadConfig()).toThrow('No workspace folder found');
    });
    it('should throw error when .env file has error', () => {
        vi.mocked(dotenv.config).mockReturnValue({
            error: new Error('Failed to load .env')
        });
        expect(() => loadConfig()).toThrow('Error loading .env file: Failed to load .env');
    });
    it('should throw error when gist URL not found', () => {
        vi.mocked(dotenv.config).mockReturnValue({ parsed: {} });
        process.env.ENV_GIST_FALLBACK_URL = ''; // Set to empty string to test missing value
        expect(() => loadConfig()).toThrow('ENV_GIST_FALLBACK_URL not found in .env file');
    });
});
//# sourceMappingURL=config.test.js.map