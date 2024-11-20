# VS Code Extension Development Lessons

## Story 1.1: Initialize VS Code Extension Project

### Summary
Set up a modern VS Code extension project using workspace-based architecture with TypeScript, ESLint, and Vitest.

### Key Insights
- Use npm workspaces for better project organization and dependency management
- Replace Jest with Vitest to avoid deprecated dependencies
- Separate extension code into `/packages/extension` for better scalability
- Configure strict TypeScript and ESLint rules early
- Use conventional commits for clear version history

### References
- `/packages/extension/`: Main extension code structure
- `.eslintrc.json`: Linting configuration
- `package.json`: Workspace and dependency setup
- `docs/plan.md`: Project structure section

## Story 1.2: Add Status Bar Button

### Summary
Implemented a VS Code status bar button with proper TypeScript typing and disposal handling.

### Key Insights
- Use StatusBarAlignment.Right with high priority (100) for consistent positioning
- Always dispose status bar items in deactivate() function
- Add items to context.subscriptions for automatic cleanup
- Mock vscode namespace in tests for proper unit testing

### References
- `/packages/extension/src/extension.ts`: Status bar implementation
- `/packages/extension/src/test/extension.test.ts`: Unit tests
- VS Code API: window.createStatusBarItem

## Story 1.3: Add Click Handler for Status Bar Button

### Summary
Implemented command registration and click handler for the status bar button with proper TypeScript typing and testing.

### Key Insights
- Use vscode.commands.registerCommand for button click handling
- Link status bar item to command via statusBarItem.command property
- Mock command registration and handler in tests
- Use async/await for command handlers to support future async operations
- Add error handling with user-friendly messages

### References
- `/packages/extension/src/extension.ts`: Command registration and handler
- `/packages/extension/src/test/extension.test.ts`: Command testing setup
- VS Code API: commands.registerCommand, window.showInformationMessage