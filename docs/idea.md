# VS Code Extension Development Prompt

## Objective

Create a Visual Studio Code extension with the following features.

## Features

### 1. Status Bar Button

- Add a button labeled **"Update .env"** to the VS Code status bar.

### 2. Functionality When Clicked

- **Check for a `.env` file** in the current workspace folder.
  - **If the `.env` file does not exist:**
    - Fetch a `.env` file from a **private GitHub Gist**. The URL of this gist should be **configurable via the extension's settings**.
    - Save the fetched `.env` file to the current workspace folder.
  - **If the `.env` file already exists:**
    - Fetch the `.env` file from the private gist.
    - **Compare** the fetched `.env` with the existing one.
    - **Update** the existing `.env` file by **adding any new key-value pairs** from the gist that are not already present.
    - **Do not modify** or overwrite existing key-value pairs in the `.env` file.

### 3. Extension Settings

- Provide a setting where users can **input the URL** of their private GitHub Gist containing the `.env` file.

### 4. Error Handling

- **Handle exceptions** gracefully (e.g., network issues, invalid gist URL, permission errors).
- Provide **user-friendly error messages** or notifications when operations fail.

### 5. Security Considerations

- Ensure that the extension **securely handles** the private gist URL.
- Do not expose the gist URL or fetched data in logs or error messages.

### 6. User Feedback

- Provide notifications or status messages to inform the user when:
  - The `.env` file is successfully fetched and created.
  - The existing `.env` file is updated with new keys.
  - Any errors occur during the process.

### 7. Testing

- Include instructions or scripts for **testing the extension** to ensure all features work as expected.

### 8. Documentation

- Provide clear documentation on how to:
  - Configure the gist URL in the settings.
  - Use the "Update .env" button.
  - Understand the extension's behavior regarding existing `.env` files.

### 9. Follow VS Code Extension Guidelines

- Adhere to the latest Visual Studio Code extension development guidelines, best practices, and API usage as per the official documentation.
- **References:**
  - **Extension API Documentation:** [https://code.visualstudio.com/api](https://code.visualstudio.com/api)
  - **Extension Guidelines:** [https://code.visualstudio.com/api/references/extension-guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
  - **Publishing Extensions:** [https://code.visualstudio.com/api/working-with-extensions/publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
  - **Samples and Examples:** [https://github.com/microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)
  - **VS Code API Reference:** [https://code.visualstudio.com/api/references/vscode-api](https://code.visualstudio.com/api/references/vscode-api)
  - **Community Discussions:** [https://stackoverflow.com/questions/tagged/visual-studio-code-extensions](https://stackoverflow.com/questions/tagged/visual-studio-code-extensions)
  - **Microsoft's Extension Authoring Pack:** [https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-extension-pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-extension-pack)
