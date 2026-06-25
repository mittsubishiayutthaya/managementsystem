# AI Context Management System

## Roles
You are an AI Assistant working in collaboration with other AI instances by sharing context through files in this folder. All context is preserved and passed forward between sessions.

## Read-First Rules
When starting a new task, you MUST read these files in order:
1. **AGENTS.md** (this file - system rules)
2. **active.md** (current task and next steps)
3. **index/repo-tree.md** (project structure)
4. **index/session-log.md** (session index)

Then check for any relevant `.md` files in `topics/` or `sessions/`

## Rolling Summary Rule
To preserve token budget and maintain efficiency:
- When a file in `sessions/` or `active.md` exceeds 50 lines, summarize the original content into concise bullet points BEFORE appending new content
- Move detailed history to `index/session-log.md` as a single-line summary entry
- Example: `- [2025-04-18] v44: Refactored NCO validation (DONE) | Strict nco_course_status usage`

## Indexing Rule
At the end of each task:
- Update `index/session-log.md` with a single-line summary including:
  - Timestamp
  - Version (if applicable)
  - Task description  
  - Status (Done/In-Progress/Blocked)
- Example: `- [2025-04-18] Leave Modal Refactor (v45): Auto-fill dates, overlap validation, post-save reset (Done)`

## History Tracking Rule
Every time User gives a command, record it in `index/command-history.md`:
- Format: `[HH:MM:SS] User: "Command/Request" -> Action: "What was done"`
- Keep recent (last 20) entries only to save space

## File Purposes

### .agents/active.md
- Current task focus and next steps
- Project environment/stack details
- Active issues or blockers
- Keep it fresh! Update when context shifts

### .agents/sessions/
- Checkpoint summaries for specific sessions
- One file per major session or milestone
- Name as: `session-[date]-[description].md`
- Archive to history when task completes

### .agents/topics/
- Long-form notes that span multiple tasks
- Technical deep dives (e.g., salary calculation logic, database schema)
- Decision logs and rationale
- Reference material for future context

### .agents/index/
- **repo-tree.md**: Project file structure (read once per major refactor)
- **command-history.md**: Recent command log (auto-purge old entries)
- **session-log.md**: Session index and summary timeline

### .agents/private/
- Do NOT commit to repo (.gitignore prevents this)
- Personal debugging notes, failed attempts, experimental code
- API keys or sensitive configuration (when needed locally)

## Deployment & Review Rules
- **Explicit Explanation & Approval**: Always explain the root cause of the problem and the proposed fix, and obtain explicit user approval BEFORE making any source code changes or execution.
- **No Agent Deployment**: The AI agent must NOT run `clasp push` or `deploy.sh`. The user will handle all pushes and deployments.
- **Push Workflow**: Code Changes locally -> Explain & Get Approval -> User performs `clasp push` / deploy.

## Collaboration Protocol
- When handing context to another AI: Include the timestamp of last update
- When resuming from context: Always verify active.md is current
- If context seems stale (>4 hours old): Perform a quick audit before proceeding
- When conflicts arise between files: active.md takes precedence over sessions/

---

**Last Updated**: 2026-06-13  
**Maintained By**: AI Context System v1.0
