# The 10 Guidelines for Developing this VS Code Extension

1. **Coding Standards**
   - Use consistent styles; employ linters like ESLint.

2. **Unit Testing**
   - Write tests covering all features and edge cases.
   - Utilize Vitest in parallel mode for unit testing.

3. **Clear Comments**
   - Explain complex code; use JSDoc/TSDoc annotations.

4. **Documentation**
   - Provide a `README.md` with instructions and examples.

5. **Error Handling**
   - Handle exceptions gracefully; provide user-friendly messages.

6. **Security**
   - Securely manage sensitive data; validate and sanitize inputs.

7. **Performance Optimization**
   - Use asynchronous operations; minimize startup impact.

8. **Adherence to Guidelines**
   - Follow VS Code's official extension development guidelines.

9. **User-Friendly UI**
   - Design intuitive UI elements; offer appropriate feedback.

10. **Regular Testing and Debugging**
    - Test across environments; utilize debugging tools effectively.

11. **Environment Variables**
    - You are in a Windows Terminal
    - Fileoperations are run with cmd /c
    - No color in testing - example: npx vitest run --no-color
