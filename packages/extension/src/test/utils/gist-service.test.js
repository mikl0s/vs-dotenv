import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GistService } from '../../utils/gist-service';
import fetch from 'node-fetch';
vi.mock('node-fetch');
describe('GistService', () => {
    const mockGistUrl = 'https://gist.githubusercontent.com/test/123/.env';
    let gistService;
    beforeEach(() => {
        gistService = new GistService(mockGistUrl);
        vi.resetAllMocks();
    });
    it('should fetch env content successfully', async () => {
        const mockContent = 'TEST_KEY=test_value';
        const mockResponse = {
            ok: true,
            text: () => Promise.resolve(mockContent)
        };
        vi.mocked(fetch).mockResolvedValueOnce(mockResponse);
        const content = await gistService.fetchEnvContent();
        expect(content).toBe(mockContent);
        expect(fetch).toHaveBeenCalledWith(mockGistUrl);
    });
    it('should handle fetch error', async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));
        await expect(gistService.fetchEnvContent()).rejects.toThrow('Error fetching gist: Network error');
    });
    it('should handle non-ok response', async () => {
        const mockResponse = {
            ok: false,
            statusText: 'Not Found'
        };
        vi.mocked(fetch).mockResolvedValueOnce(mockResponse);
        await expect(gistService.fetchEnvContent()).rejects.toThrow('Failed to fetch gist: Not Found');
    });
    it('should handle empty content', async () => {
        const mockResponse = {
            ok: true,
            text: () => Promise.resolve('')
        };
        vi.mocked(fetch).mockResolvedValueOnce(mockResponse);
        await expect(gistService.fetchEnvContent()).rejects.toThrow('Gist content is empty');
    });
});
//# sourceMappingURL=gist-service.test.js.map