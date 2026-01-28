---
applyTo: "**"
---

-Apply the `./instructions/a11y.instructions.md`, `./instructions/code-review.instructions.md` and `./instructions/reactjs.instructions.md` instructions.
- Add a detailed comment block at the top of the file to know about the page functionality, purpose, props, and behavior.
- Save the chats prompt history for future reference in folder named `logs` with the file name as `<todaydate>-<username>.log.md`

- Avoid generating code that introduces ESLint warnings or errors.
- Format code according to Prettier rules automatically.
- If a specific pattern or convention is used repeatedly in the codebase, learn and apply it consistently.
- If unsure about a specific formatting or linting detail, err on the side of consistency with existing project files.
- Prioritize readability and maintainability in all suggestions.
- When refactoring or suggesting code, ensure it aligns with the existing code style and project conventions.
- Provide concise and clear explanations for any suggested changes or optimizations.
- Do not introduce new dependencies unless explicitly requested.

## Documentation Standards
Add a detailed comment at each method/function/section describing purpose.
Write a structured comment block before this section explaining:
 - The purpose of this section or function
 - Its key inputs, outputs, and expected behavior
 - Any dependencies, validations, or business logic involved
 - Use developer documentation tone and clear technical language

# Project general coding standards
- Do not use deprecated methods, always use latest methods and standards
- When generating or suggesting code, prioritize adherence to the project's `.eslintrc.json` and `.prettierrc.json` configurations.
- For React components, ensure proper typing for props and state using JavaScript interfaces or types.
- Avoid generating code that introduces ESLint warnings or errors.
- Format code according to Prettier rules automatically.
- If a specific pattern or convention is used repeatedly in the codebase, learn and apply it consistently.
- If unsure about a specific formatting or linting detail, err on the side of consistency with existing project files.
- Prioritize readability and maintainability in all suggestions.
- When refactoring or suggesting code, ensure it aligns with the existing code style and project conventions.
- Provide concise and clear explanations for any suggested changes or optimizations.
- Do not introduce new dependencies unless explicitly requested.

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information