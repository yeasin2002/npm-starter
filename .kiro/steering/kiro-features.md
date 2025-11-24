# Kiro Features & Capabilities

## Core Capabilities

Kiro is an AI-powered IDE assistant that can:

- Read, write, and modify files in your workspace
- Execute shell commands and manage background processes
- Search code using fuzzy file search and regex patterns
- Analyze diagnostics (compile errors, linting issues, type errors)
- Fetch content from the internet for up-to-date information
- Work with multiple files simultaneously for efficient operations

## Autonomy Modes

- **Autopilot Mode**: Kiro can modify files autonomously within the workspace
- **Supervised Mode**: Users review and can revert changes after application

## Chat Context

Enhance Kiro's understanding by using context markers:

- `#File` or `#Folder` - Include specific files or folders in context
- `#Problems` - Share current file diagnostics
- `#Terminal` - Include terminal output
- `#Git Diff` - Show current git changes
- `#Codebase` - Scan entire codebase (once indexed)

You can also drag images into chat for visual context.

## Specs System

Specs provide structured feature development:

- **Purpose**: Formalize design and implementation process
- **Structure**: Requirements → Design → Implementation tasks
- **Benefits**: Incremental development with control and feedback
- **File References**: Use `#[[file:<relative_file_name>]]` to include external specs (OpenAPI, GraphQL, etc.)

## Agent Hooks

Automate workflows with event-triggered agent executions:

### Trigger Events

- When a message is sent to the agent
- When an agent execution completes
- When a new session is created
- When a code file is saved
- Manual button clicks

### Common Use Cases

- Auto-update and run tests on file save
- Sync translation strings across languages
- Spell-check documentation on demand
- Validate code changes automatically

### Actions

- Send messages to the agent (reminders, instructions)
- Execute shell commands with message input

### Management

- View hooks in Explorer → "Agent Hooks" section
- Create hooks via Command Palette → "Open Kiro Hook UI"

## Steering Rules

Customize Kiro's behavior with steering files in `.kiro/steering/*.md`:

### Inclusion Modes

1. **Always Included** (default) - Applied to all interactions
2. **Conditional** - Applied when specific files match patterns:
   ```yaml
   ---
   inclusion: fileMatch
   fileMatchPattern: 'README*'
   ---
   ```
3. **Manual** - Applied only when referenced via `#` context:
   ```yaml
   ---
   inclusion: manual
   ---
   ```

### File References

Use `#[[file:<relative_file_name>]]` to include external documentation (OpenAPI specs, GraphQL schemas, etc.)

## Model Context Protocol (MCP)

Extend Kiro with MCP servers for additional capabilities:

### Configuration

- **User Level**: `~/.kiro/settings/mcp.json` (global)
- **Workspace Level**: `.kiro/settings/mcp.json` (per workspace)
- **Precedence**: User < Workspace1 < Workspace2 (later overrides earlier)

### Configuration Structure

```json
{
  "mcpServers": {
    "server-name": {
      "command": "uvx",
      "args": ["package-name@latest"],
      "env": {
        "ENV_VAR": "value"
      },
      "disabled": false,
      "autoApprove": ["tool-name"]
    }
  }
}
```

### Management

- Servers auto-reconnect on config changes
- Reconnect manually via MCP Server view in Kiro panel
- Search Command Palette for "MCP" commands
- Use `uvx` (requires `uv` Python package manager)

### Installation

Most MCP servers use `uvx` which requires `uv`:

- Install via pip, homebrew, or other Python package managers
- See: https://docs.astral.sh/uv/getting-started/installation/
- No separate server installation needed - `uvx` downloads on first run

## Best Practices

### File Operations

- Use `strReplace` for targeted edits in large files
- Invoke multiple independent `strReplace` operations simultaneously
- Use `fsWrite` for small files, then `fsAppend` for additional content
- Read multiple files at once with `readMultipleFiles`

### Command Execution

- Use `executePwsh` for quick commands
- Use `controlPwshProcess` for long-running processes (dev servers, watchers)
- Never use `cd` command - use `path` parameter instead
- Check process output with `getProcessOutput`

### Code Quality

- Use `getDiagnostics` instead of bash commands for error checking
- Run diagnostics after editing files to validate changes
- Prefer `grepSearch` over bash `grep` for code searches

### Efficiency

- Perform independent operations in parallel when possible
- Use appropriate tools for the task (don't use `cat` when `readFile` exists)
- Keep code minimal - write only what's needed
