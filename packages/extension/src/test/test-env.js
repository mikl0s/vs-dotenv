// Mock vscode module for tests
const vscode = {
    window: {
        createStatusBarItem: () => ({
            text: '',
            tooltip: '',
            command: '',
            show: () => { },
            dispose: () => { }
        }),
        showInformationMessage: () => Promise.resolve(),
        showErrorMessage: () => Promise.resolve()
    },
    StatusBarAlignment: {
        Right: 1
    },
    commands: {
        registerCommand: () => ({
            dispose: () => { }
        })
    },
    workspace: {
        workspaceFolders: undefined
    },
    Uri: {
        file: (filePath) => {
            const uri = {
                scheme: 'file',
                authority: '',
                path: filePath,
                query: '',
                fragment: '',
                fsPath: filePath,
                with: function () { return uri; },
                toJSON: function () { return uri; }
            };
            return uri;
        }
    },
    ExtensionMode: {
        Test: 1
    }
};
export default vscode;
//# sourceMappingURL=test-env.js.map