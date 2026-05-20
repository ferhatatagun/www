# Rules and Commands That Actually Stick

Project rules and slash commands only work if you use them. Sounds obvious. But most teams write a long `.cursorrules` once, forget it, and keep repeating the same instructions in every chat. Here’s how to make rules and commands stick.

## Start with pain, not theory

Don’t write rules because “we should have rules.” Write them when something keeps going wrong. Someone keeps using `any`, or forgetting to add loading states, or writing components that are 400 lines. Catch that in a review, add one line to `.cursorrules`: “No `any`. Use proper types.” Next time the model sees it before it suggests code. That’s a rule that sticks because it solves a real problem.

Same for commands. If you find yourself typing the same prompt every day (“add error handling and use our toast helper”), turn it into a custom instruction or a saved prompt. The best commands come from repetition you’re already doing.

## Keep the list short

Long rule files get ignored. The model gets a wall of text and either skips it or follows it inconsistently. I aim for under 20 lines for project-wide rules. Things like: default language, no inline styles, use our design tokens, how we name components. One line per idea. If a rule is more than a sentence, it’s probably two rules or it’s too vague.

Commands: same idea. A few high-leverage ones beat a long menu. “Refactor this to use the shared hook.” “Add tests for the happy path and one error case.” You’ll remember and use 3–5; you’ll forget 20.

## Make rules visible when they matter

Rules in a file the model reads are good. Rules that appear in the flow are better. For example: “When editing components in `src/ui/`, prefer our design system; do not introduce new colors or spacing values.” So when the model is in that folder, the rule is relevant. You can’t always do this (Cursor doesn’t support per-folder rules yet), but you can keep the rule file focused so the model isn’t drowning in unrelated stuff.

For commands, put the ones you use daily in a place you actually click: Cursor’s custom instructions, or a small cheat sheet in the repo. If it’s buried in a doc nobody opens, it won’t stick.

## Iterate from real usage

Every few weeks, look at what you had to correct in reviews or re-prompt. Those are candidates for new rules or commands. And if a rule never gets followed (or you keep disabling it), delete it or shorten it. Dead rules add noise and teach the team to ignore the file.

Rules and commands aren’t a one-time setup. They’re a small loop: notice a repeated mistake → add or tweak a rule → see if behavior improves → repeat. The ones that stick are the ones that fix a pain you actually feel.
