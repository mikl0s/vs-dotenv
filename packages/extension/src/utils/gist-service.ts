import fetch from 'node-fetch';

export class GistService {
    constructor(private readonly gistUrl: string) {}

    async fetchEnvContent(): Promise<string> {
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
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching gist: ${error.message}`);
            }
            throw error;
        }
    }
}
