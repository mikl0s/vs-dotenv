import fetch from 'node-fetch';
export class GistService {
    constructor(gistUrl) {
        this.gistUrl = gistUrl;
    }
    async fetchEnvContent() {
        try {
            const response = await fetch(this.gistUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch gist: ${response.statusText}`);
            }
            const content = await response.text();
            if (!content) {
                throw new Error('Gist content is empty');
            }
            return content;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching gist: ${error.message}`);
            }
            throw error;
        }
    }
}
//# sourceMappingURL=gist-service.js.map