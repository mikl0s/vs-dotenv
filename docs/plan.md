# VS Code Extension Development Plan

## References

- **Extension API Documentation:** [https://code.visualstudio.com/api](https://code.visualstudio.com/api)
- **Extension Guidelines:** [https://code.visualstudio.com/api/references/extension-guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- **Publishing Extensions:** [https://code.visualstudio.com/api/working-with-extensions/publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- **Samples and Examples:** [https://github.com/microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)
- **VS Code API Reference:** [https://code.visualstudio.com/api/references/vscode-api](https://code.visualstudio.com/api/references/vscode-api)
- **Community Discussions:** [https://stackoverflow.com/questions/tagged/visual-studio-code-extensions](https://stackoverflow.com/questions/tagged/visual-studio-code-extensions)
- **Microsoft's Extension Authoring Pack:** [https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-extension-pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-extension-pack)

## Project Structure

The project uses a workspace-based structure for better organization and scalability:

- `/packages/extension`: Main VS Code extension code
- `/docs`: Project documentation
- Uses npm workspaces for dependency management
- TypeScript for type safety
- Vitest for testing with parallel execution support

## Epics

### 1. Status Bar Button

- [x] **Story 1.1:** Create a new VS Code extension project.
  - Created workspace-based project structure
  - Set up TypeScript configuration
  - Configured modern testing with Vitest
  - Implemented clean dependency management
  - Added parallel test execution
- [x] **Story 1.2:** Add a status bar button labeled "Update .env".
  - Added status bar button with "Update .env" text
  - Implemented proper disposal handling
  - Added unit tests with improved mocking
- [x] **Story 1.3:** Implement basic click event handler for the status bar button.
  - Added command registration with proper disposal
  - Implemented click handler with info message
  - Added comprehensive unit tests
  - Prepared for future .env update logic

### 2. Functionality When Clicked

- [x] **Story 2.1:** Check if a `.env` file exists in the current workspace folder.
  - Created env-file utility for file existence checks
  - Added workspace folder validation
  - Implemented error handling for missing workspace
  - Added comprehensive unit tests with VS Code API mocking
- [x] **Story 2.2:** Fetch a `.env` file from a private GitHub Gist if the file does not exist.
  - Added config utility to read gist URL from .env
  - Created gist service for fetching content
  - Implemented error handling and user notifications
  - Added comprehensive unit tests
- [x] **Story 2.3:** Save the fetched `.env` file to the current workspace folder.
- [ ] **Story 2.4:** Fetch the `.env` file from the private gist if the file already exists.
- [ ] **Story 2.5:** Compare the fetched `.env` file with the existing one.
- [ ] **Story 2.6:** Update the existing `.env` file by adding new key-value pairs from the gist.
- [ ] **Story 2.7:** Ensure existing key-value pairs in the `.env` file are not modified or overwritten.

### 3. Extension Settings

- [ ] **Story 3.1:** Add a setting to input the URL of the private GitHub Gist.
- [ ] **Story 3.2:** Validate the gist URL setting.
- [ ] **Story 3.3:** Ensure the gist URL is configurable via the extension's settings.

### 4. Error Handling

- [ ] **Story 4.1:** Handle network issues gracefully.
- [ ] **Story 4.2:** Handle invalid gist URL errors.
- [ ] **Story 4.3:** Handle permission errors when accessing the gist.
- [ ] **Story 4.4:** Provide user-friendly error messages or notifications.

### 5. Security Considerations

- [ ] **Story 5.1:** Ensure the extension securely handles the private gist URL.
- [ ] **Story 5.2:** Do not expose the gist URL or fetched data in logs or error messages.

### 6. User Feedback

- [ ] **Story 6.1:** Notify the user when the `.env` file is successfully fetched and created.
- [ ] **Story 6.2:** Notify the user when the existing `.env` file is updated with new keys.
- [ ] **Story 6.3:** Notify the user of any errors during the process.

### 7. Testing

- [ ] **Story 7.1:** Write unit tests for the extension's core functionality.
- [ ] **Story 7.2:** Write integration tests for the extension's interaction with GitHub Gist.
- [ ] **Story 7.3:** Include instructions or scripts for running tests.

### 8. Documentation

- [ ] **Story 8.1:** Document how to configure the gist URL in the settings.
- [ ] **Story 8.2:** Document how to use the "Update .env" button.
- [ ] **Story 8.3:** Document the extension's behavior regarding existing `.env` files.
- [ ] **Story 8.4:** Provide a README file with installation and usage instructions.

### 9. Follow VS Code Extension Guidelines

- [ ] **Story 9.1:** Adhere to the latest Visual Studio Code extension development guidelines.
- [ ] **Story 9.2:** Ensure best practices and API usage as per the official documentation.
- [ ] **Story 9.3:** Review and update the extension to follow any new guidelines or best practices.

## Notes

- Each story should be as small as possible to ensure quick and efficient development.
- Regularly refer to the references provided to ensure compliance with the latest VS Code extension development guidelines.
- Use the Microsoft Extension Authoring Pack for development to streamline the process.
