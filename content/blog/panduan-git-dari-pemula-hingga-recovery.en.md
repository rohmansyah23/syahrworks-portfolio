*Written for learners who are new to Git. Commands follow modern Git versions and work on Windows, macOS, and Linux.*

## Why Git?

Ever changed your code, broken everything, and wished you could go back to how things were 30 minutes ago? Git solves exactly that.

But Git is not just an "undo" button. It is a system for:

- recording changes,
- creating checkpoints,
- working in parallel,
- sharing changes,
- and recovering lost work.

This guide's goal is not to make you memorize commands. It's to build a mental model — to understand where you are, what each command changes, and how to get back when something goes wrong.

---

## The Mental Model: Four Areas

Every Git workflow lives in four areas:

```
Working Tree        →  the files on your disk, where you edit
     ↓
Staging Area        →  the changes you've selected for the next commit
     ↓
Commit              →  changes recorded permanently in history
     ↓
Remote              →  the shared repository (GitHub, GitLab, etc.)
```

Keep this model in mind — every command in this guide moves something between these four areas.

---

## Part 1 — The Daily Workflow

### Setting Up Git for the First Time

After installing Git, tell it who you are. This identity is recorded in every commit.

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "you@example.com"
```

`--global` applies to every project on your machine. Check your configuration anytime with `git config --list`.

Two more settings worth having from day one:

- `git config --global init.defaultBranch main` — new repositories default to a `main` branch.
- `git config --global core.editor "code --wait"` — the editor Git opens when it needs a message from you.

**Common mistake:** forgetting `user.email` → Git refuses with "Please tell me who you are". The fix is running the two commands above.

### Creating a Repository

For a new project:

```bash
git init
```

This creates a hidden `.git` folder that starts tracking your files. Run `git status` right away — it becomes the command you use every single day.

### Reading the Repository State

`git status` tells you exactly where your changes are. A file can be in one of these states:

- **Untracked** — new, Git hasn't seen it yet.
- **Modified** — changed since the last commit.
- **Staged** — selected for the next commit.
- **Committed** — safely recorded in history.

### Add: Selecting, Not Saving

`git add` does not save changes to history. It only chooses which changes will enter the next commit.

```bash
git add app/page.tsx   # stage one file
git add .              # stage all changes
git add -p             # pick changes piece by piece
```

`git add -p` is how you keep a "fix typo" commit separate from an "add feature" commit.

### Commit: A Clean Unit of Work

```bash
git commit -m "feat(blog): add git guide article"
```

A good commit has one purpose, a clear message, and doesn't mix unrelated changes. The `type(scope): description` pattern (`fix(home): ...`, `feat(blog): ...`) keeps history readable for everyone.

### Seeing What Changed

| Command | Answers the question |
| --- | --- |
| `git status` | What changed? |
| `git diff` | What's inside the changes not yet staged? |
| `git diff --staged` | What will go into the next commit? |
| `git log` | What has happened so far? |
| `git show <commit>` | What's inside a specific commit? |

```bash
git log --oneline -5
```

---

## Part 2 — From Local to GitHub

This is the first milestone: connecting your local repository to a shared one.

### What Is a Remote?

```
Laptop            GitHub
└── Local repo    └── Remote repo
```

`origin` is just a name — the conventional name for your main remote.

### Connecting the Repository

```bash
git remote add origin https://github.com/yourname/your-project.git
git remote -v
```

### The First Push

```bash
git push -u origin main
```

`-u` ("upstream") remembers the link, so from now on a plain `git push` is enough.

### The Daily Loop (With Push)

Committing saves changes locally. Pushing sends them to the shared repository.

```bash
git status
git add .
git commit -m "..."
git push
```

### Pull, Fetch, and Push

```
remote
  │
  ├── fetch  → downloads changes/information
  │
  └── pull   → fetch + integrate into your branch

local
  │
  └── push   → sends your commits to the remote
```

- `git fetch` only updates your view of the remote — safe, nothing is changed.
- `git pull` fetches *and* merges the changes into your current branch.
- `git push` sends your local commits to the remote.

---

## Part 3 — Undoing Mistakes Without Panic

You will make mistakes. Git is designed so almost all of them are fixable.

### Change Not Yet Staged

```bash
git restore <file>
```

Discards working-tree changes for that file.

### Already Staged

```bash
git restore --staged <file>
```

Removes the file from staging, keeping its content.

### Commit Already Made

```bash
git revert <commit>
```

Creates a **new** commit that reverses an old one. Safe for pushed commits — the original stays in history.

### restore vs revert vs reset

| Command | Purpose |
| --- | --- |
| `git restore` | Discard/restore file changes |
| `git revert` | New commit that cancels an old commit |
| `git reset` | Move a branch/HEAD pointer |

**Warning:** `git reset --hard` is where beginners panic. It discards both staged and working-tree changes. Only use it when you are sure — and remember that reflog (Part 7) can still help.

---

## Part 4 — Branch: Working Without Touching Main

Scenario: you're building a login feature, but production needs a hotfix today.

Without branches:

```
main
└── all work mixed together
```

With branches:

```
main
├── hotfix
└── feature-login
```

### Creating and Switching

The modern commands use `git switch`, not `git checkout` (which still works, but is the legacy name):

```bash
git switch -c feature-login   # create + switch to a new branch
git switch main               # switch back
```

### Pushing a Branch

```bash
git push -u origin feature-login
```

### Merging

```bash
git switch main
git merge feature-login
```

---

## Part 5 — Team Workflow and Pull Request

Once branches make sense, collaboration follows a pattern:

```
main
 ↓
create feature branch
 ↓
make changes
 ↓
commit
 ↓
push
 ↓
Pull Request
 ↓
code review
 ↓
merge
```

- **Branch protection** prevents direct pushes to `main`.
- A **Pull Request** proposes changes from your branch.
- **Code review** lets others check before merging.

GitHub details matter less than the flow — the focus here is Git itself.

---

## Part 6 — Merge vs Rebase

Both combine changes, but differently. Start from a feature branched off `main`:

```
main
A---B---C
     \
      D---E feature
```

### Merge

```
A---B---C-------M
     \         /
      D---E----
```

A merge creates a merge commit and keeps the original branch history visible.

### Rebase

```
A---B---C---D'---E'
```

Rebase doesn't magically "change the past". Git creates **new** commits with a different parent, placed on top of `main`.

### When to Use Which

> Rebase a private branch that no one else uses; merge a branch that is already part of shared history.

And avoid absolutism. The practical rule:

> Don't casually rebase a branch other people are using — rebase rewrites commits and forces everyone else to re-sync their branches.

---

## Part 7 — Cleaning Up History

Feature work often produces messy small commits. Tidy them before they join shared history:

```bash
git rebase -i HEAD~5
```

In the editor, change each line's verb:

- `pick` — keep the commit.
- `reword` — keep the change, edit the message.
- `squash` — merge into the previous commit and edit the combined message.
- `fixup` — merge into the previous commit, keep its message.

Example:

```
fix typo
fix typo again
fix typo final
add blog
```

becomes:

```
feat(blog): add git guide article
```

Tidy before the history becomes part of a shared branch — not after.

---

## Part 8 — Stash and Cherry-Pick

### When You Must Leave Work Unfinished

You're halfway through feature A when an urgent hotfix demands a branch switch. Committing feels heavy — stash is the answer:

```bash
git stash
git switch main
# ...fix the hotfix...
git switch feature-a
git stash pop
```

`git stash list` shows your saved stacks; `git stash apply` restores one without removing it from the list.

### Taking a Single Commit From Another Branch

```bash
git cherry-pick <commit>
```

Cherry-pick creates a **new** commit based on the changes of that commit — without pulling in the whole branch.

---

## Part 9 — Conflict: When Git Can't Choose

A conflict happens when two people change the same lines. Git can't decide who is right — you do. The file contains markers:

```text
<<<<<<< HEAD
your version
=======
version from the other branch
>>>>>>> feature
```

The workflow:

```
merge/rebase
 ↓
conflict
 ↓
open the file
 ↓
decide the final result
 ↓
remove markers
 ↓
git add
 ↓
continue the operation
```

For a **merge**, finish with a normal commit:

```bash
git add <file>
git commit
```

For a **rebase**, continue the rebase:

```bash
git add <file>
git rebase --continue
```

To back out entirely:

```bash
git merge --abort
git rebase --abort
```

Conflicts are normal — not the enemy.

---

## Part 10 — Recovery: When Things Really Go Wrong

This section isn't for daily study. Keep it as a first-aid kit.

### Reflog — Finding "Lost" Commits

Scenario: you ran `git reset --hard HEAD~3`, then realized recent commits are "gone".

Stay calm. `git reflog` is a **local** record of every reference movement:

```bash
git reflog
```

Recovery — turn the lost commit into a safe branch:

```bash
git switch -c recovery-branch <sha>
```

Two honest caveats: reflog is a local record, not a cloud backup — the same machine you broke is the one holding the log. And not everything is always recoverable; that's why this section is named "recovery", not "guarantee".

### Bisect — Finding the Culprit Commit

A bug appears, but you don't know which commit caused it — and there are 200 commits since the last healthy version:

```bash
git bisect start
git bisect bad            # current commit is broken
git bisect good <commit>  # last healthy commit
```

Test each candidate; mark `bad` or `good`. Git halves the search every time:

```
200 → 100 → 50 → 25 → ... → 1 culprit
```

With 200 commits you find the culprit in at most 8 steps — not 200.

```bash
git bisect reset
```

---

## Part 11 — Secrets and Serious Mistakes

Deleting a file is not enough — history still keeps it.

```
.env
API_KEY=secret
```

> Removing `.env` from the working tree does not remove it from history.

For a history rewrite, `git-filter-repo` is the modern tool:

```bash
git filter-repo --path .env --invert-paths
git remote add origin <url>
git push --force origin main
```

But the order that matters most is:

```
Secret leaked
 ↓
REVOKE / ROTATE the secret
 ↓
clean the history
 ↓
force push if needed
 ↓
audit the repository
```

Cleaning history does **not** make a leaked secret safe again. Rotate first, always.

Prevention: add `.gitignore` early, and document variable names in `.env.example` without any values.

---

## Part 12 — Fork and Upstream (Advanced)

Optional — most beginners don't need this yet. This is the pattern for contributing to a repository you forked:

```
Original repository
        ↓
      Fork
        ↓
Your repository
        ↓
Local clone
```

```bash
git remote add upstream https://github.com/owner/original.git
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
```

The two remotes:

- `origin` → your repository.
- `upstream` → the source repository.

`--ff-only` only moves forward if it can go straight — if Git refuses, you have local commits not yet merged. That's valuable information.

---

## Quick Reference (by Situation)

**I just changed code:**

```bash
git status
git diff
git add .
git commit -m "..."
git push
```

**I want to discard file changes:**

```bash
git restore <file>
```

**I made a commit by mistake:**

- History not shared yet → `git reset` (understand the consequences).
- Commit already shared → `git revert <commit>`.

**I want to build a feature:**

```bash
git switch -c new-feature
```

**I must switch work temporarily:**

```bash
git stash
git switch <branch>
```

**I got a conflict:**

```
open the file → resolve → git add → continue merge/rebase
```

**I lost a commit:**

```bash
git reflog
```

**I don't know which commit broke things:**

```bash
git bisect
```

---

## Conclusion

Git is not about memorizing commands.

It's about understanding:

1. the state of your repository,
2. the changes you want to save,
3. the history you want to share,
4. and how to get back when you make a mistake.

**Your daily minimum:**

```bash
git status
git add .
git commit -m "..."
git push
```

**Once you work with branches:**

```bash
git switch -c new-feature
git add .
git commit -m "..."
git push -u origin new-feature
```

Start with the daily loop until it becomes a habit. Add branches, then teamwork. And keep the Recovery section in mind — not to memorize, but to know that **nothing is truly lost in Git**.
