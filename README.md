# VS Code .env Update Extension

A Visual Studio Code extension that automatically updates your `.env` files by syncing with a private GitHub Gist. Keep your environment variables in sync across your team while maintaining local overrides.

## Features

- 🔄 Sync `.env` files with a private GitHub Gist
- 🔒 Preserve local environment variable values
- ➕ Add new variables automatically
- 🚫 Never overwrite existing values
- 🔔 Clear notifications for all actions
- ⚡ Fast and lightweight

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install vscode-update-env`
4. Press Enter

## Usage

1. Create a `.env` file in your project root with:
   ```
   ENV_GIST_FALLBACK_URL=<your-gist-raw-url>
   ```
2. Click the "Update .env" button in the status bar
3. The extension will:
   - Create `.env` if it doesn't exist by fetching from your Gist
   - Add new variables from the Gist (coming soon)
   - Preserve your existing values (coming soon)

## Requirements

- VS Code 1.84.0 or higher
- Node.js 18.0.0 or higher
- A GitHub Gist containing your template `.env` file
- The raw URL of your Gist in your local `.env` file

## Current Status

The extension is under active development. Currently supports:
- ✅ Status bar integration
- ✅ Checking for existing `.env` files
- ✅ Fetching `.env` content from Gist
- ✅ Creating new `.env` files from Gist
- ✅ Saving fetched `.env` files with proper error handling
- 🚧 Updating existing `.env` files (coming soon)
- 🚧 Preserving local values (coming soon)

## Extension Settings

This extension contributes the following settings:

* `updateEnv.gistUrl`: URL of the private GitHub Gist containing your template
* `updateEnv.autoUpdate`: Enable/disable automatic updates when opening a project

## Development

This project uses a modern workspace-based architecture:

```bash
# Install dependencies
npm install

# Compile the extension
npm run compile

# Watch for changes
npm run watch

# Run tests (with parallel execution)
npm run test
```

## Project Structure

- `/packages/extension`: Main extension code
  - `src/utils`: Utility functions for file operations and Gist integration
  - `src/test`: Comprehensive test suite with parallel execution
- `/docs`: Project documentation
- Uses npm workspaces for clean dependency management
- TypeScript for type safety
- Vitest for testing with parallel execution support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 VS Code .env Update Extension Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [VS Code API](https://code.visualstudio.com/api)
- All contributors who help make this project better
