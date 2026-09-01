---
name: token-efficiency
description: Token optimization best practices for cost-effective AI agent usage. Automatically applies efficient file reading, command execution, and output handling strategies. Includes model selection guidance. Prefers targeted queries and commands over full file reads.
version: 1.5.0
---

# Token Efficiency Expert

This skill provides token optimization strategies for cost-effective AI agent usage across all projects. These guidelines help minimize token consumption while maintaining high-quality assistance.

## Core Principle

**ALWAYS follow these optimization guidelines by default unless the user explicitly requests verbose output or full file contents.**

Default assumption: **Users prefer efficient, cost-effective assistance.**

---

## Model Selection Strategy

**Use the right model for the task to optimize cost and performance:**

### Deep Thinking Models / Opus - For Learning and Deep Understanding
- Learning new codebases - Understanding architecture, code structure, design patterns
- Broad exploration - Identifying key files, understanding repository organization
- Deep analysis - Analyzing complex algorithms, performance optimization
- Reading and understanding - When you need to comprehend complex existing architecture before making changes
- Very complex debugging - Only when routine models can't solve it or issue is architectural

### Fast / Efficient Models / Flash / Sonnet - For Regular Development Tasks (DEFAULT)
- Writing code, editing and fixing, debugging, testing, documentation, deployment, general questions

---

## Token Optimization Rules (Quick Reference)

### 1. Use Quiet/Minimal Output Modes
Use `--quiet`, `-q`, `--silent` flags by default. Only use verbose when user explicitly asks.

### 2. NEVER Read Entire Log Files
Always filter before reading: `tail -100`, `grep -i "error"`, specific time ranges.

### 3. Check Lightweight Sources First
Check `git status --short`, `package.json`, `requirements.txt` before reading large files.

### 4. Use Grep Instead of Reading Files
Search for specific content with Grep tool instead of reading entire files.

### 5. Read Files with Limits
Use offset and line range limits. Avoid reading thousands of lines at once.

### 6. Use Targeted File Operations
For small, direct edits, use targeted replacement tools instead of rewriting entire multi-thousand line files.

### 7. Filter Command Output
Limit scope: `head -50`, `find . -maxdepth 2`, `tree -L 2`.

### 8. Summarize, Don't Dump
Provide structured summaries of directory contents, code structure, and command output.

### 9. Use Head/Tail for Large Output
Sample large outputs with head/tail filters rather than dumping entire logs into the context.

### 10. Direct-to-Value Responses
Eliminate boilerplate pleasantries, avoid echoing entire user prompts or duplicate code blocks, and deliver concise, high-signal answers.
