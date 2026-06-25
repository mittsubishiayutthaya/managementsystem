# 🤖 AI Context Management System

This folder structure enables seamless collaboration between AI instances and preserves institutional knowledge across development sessions.

## Quick Start

### For AI Assistants
1. **Start of Session**: Always read in this order:
   - `AGENTS.md` (rules)
   - `active.md` (current task)
   - `index/repo-tree.md` (project map)
   - `index/session-log.md` (history)

2. **During Task**: Update `active.md` with progress

3. **End of Session**: 
   - Summarize task in `index/session-log.md`
   - Archive old session notes
   - Leave actionable next steps in `active.md`

### For Humans (Project Owner)
- **View Current Status**: Check `active.md` 📋
- **Project Structure**: See `index/repo-tree.md` 🗂️
- **Version History**: Check `index/session-log.md` 📅
- **Recent Commands**: Review `index/command-history.md` 📝

## Folder Guide

| Folder | Purpose | Privacy | Notes |
|--------|---------|---------|-------|
| `.` | Core system rules | ✅ Public | AGENTS.md defines everything |
| `sessions/` | Session checkpoints | ✅ Public | Timestamped session notes |
| `topics/` | Long-form research | ✅ Public | Shared knowledge base |
| `private/` | Sensitive notes | 🔒 Private | Auto-ignored via .gitignore |
| `index/` | Metadata & history | ✅ Public | Auto-generated references |
| `skills/` | Domain expertise | ✅ Public | Supabase & PostgreSQL guides |

## Key Files Explained

### 📋 AGENTS.md
**The Constitution** - System rules, protocols, and collaboration guidelines. Read this first.
- Rules for reading and writing
- Rolling summary protocol (save tokens!)
- Indexing requirements
- Command history format

### 🎯 active.md
**The Dashboard** - Current task, project environment, and next steps.
- What are we working on?
- Project stack and tech details
- Phase priorities
- Known blockers

### 🗂️ index/repo-tree.md
**The Map** - Project structure and file descriptions.
- Folder layout
- File purposes
- Data models
- Version history

### 📅 index/session-log.md
**The Timeline** - Summary of all completed tasks with status.
- One-line per task
- Completion date
- Status (✅ Done / 🔄 In-Progress / ❌ Blocked)

### 📝 index/command-history.md
**The Log** - Recent user commands and actions.
- Timestamp + user request + agent action
- Keep last 20 entries only
- Archive older entries

---

## Project Stack (Auto-Detected)

```
🔷 Frontend: Google Apps Script HTML Service + Tailwind CSS
🔷 Backend: Google Apps Script (JavaScript)  
🔷 Database: Supabase PostgreSQL + RLS
🔷 Language: Thai (UI & documentation)
🔷 Deployment: Clasp CLI + deploy.sh
```

### Current Version: v45
**Latest**: Leave Modal Refactor (auto-fill dates, overlap validation)

---

## Examples

### Example 1: Recording a Command
```
[14:32:15] User: "Fix base salary tier logic" 
         -> Action: "Identified threshold bug, changed > 1 to >= 1 in service calculation"
```

### Example 2: Session Summary
```
- [2025-04-18] v45: Leave Modal Refactor (Done) | Auto-fill 9 types, overlap check, form reset
```

### Example 3: Rolling Summary (when file > 50 lines)
**Before Archive**:
```
- Researched PayPal API integration
- Configured webhook endpoints
- Tested transaction flow
- Found rate limit issue
```
**After Rollup**: `[Topic-X-Archive] PayPal Integration (20 lines) → Moved to session-[date]-paypal.md`

---

## Token-Saving Tips

1. **Use Rolling Summaries**: Convert detailed notes to bullet points
2. **Archive Old Sessions**: Move completed tasks to history
3. **Index Everything**: Keep index files lean and scannable
4. **Private Draft**: Use `.agents/private/` for experimental notes before committing

---

## Best Practices

✅ **DO**
- Update `active.md` frequently
- Add one-line entries to session-log
- Use topic files for deep dives
- Review AGENTS.md rules monthly

❌ **DON'T**
- Commit files to `.agents/private/` (auto-ignored)
- Let sessions exceed 75 lines (archive early)
- Skip reading context files at session start
- Leave "TODO" notes without timestamps

---

**Established**: 2025-04-18  
**Version**: Context System v1.0  
**Next Update**: When v46 deploys  

👉 **Start here**: Read `AGENTS.md` and `active.md` first!
