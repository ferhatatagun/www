# Cursor IDE and Prompt Engineering

Cursor brings AI directly into a VS Code–based IDE. For effective use, **prompt engineering** and **context management** matter.

## Providing the Right Context

- **@file**: Reference a specific file; the model better understands both that file and project structure.
- **@web**: Add the web for up-to-date docs or API references.
- **@docs**: Point to in-project documentation.

Requests like “write an example for the latest version of this API” then get accurate results.

## Short, Clear Instructions

- One task at a time: e.g. “Add a loading state to this component”.
- Specify format: “Write in TypeScript”, “use Tailwind classes”.
- State what to avoid: “no inline styles”, “no `any`”.

## Cursor Rules (.cursorrules)

In the project root, a `.cursorrules` file lets you define stable rules:

- Default language (e.g. TypeScript)
- Style preferences (Tailwind, BEM, etc.)
- Expectations for writing tests
- Codebase-specific shorthand

You don’t have to repeat these in every chat.

## Summary

In Cursor, productivity improves with the right context (@file, @web) and clear, short prompts. Using `.cursorrules` for consistency helps you get more predictable output from AI.
