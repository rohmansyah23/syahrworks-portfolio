*Written for learners who are new to Git. Commands follow modern Git versions and work on Windows, macOS, and Linux.*

## Why Git?

Git is a tool that records **every change** to your code in chronological order. Think of it as "save points" in a game: whenever something breaks, you can rewind to an earlier state. On top of that, Git lets many people work together without overwriting each other — which is why it has become the industry standard.

Many beginners avoid Git because it feels complicated and intimidating. But once you understand three simple levels, Git becomes the tool that makes you *brave enough to experiment*: almost everything can be undone.

---

## Level 1 — Beginner: Saving Your Daily Changes

### First-Time Setup

After installing Git, tell it who you are. This is recorded in every commit.

```bash
git config --global user.name "Muhammad Rohman Syah"
git config --global user.email "you@example.com"
```

`--global` applies to every project on your machine. Two other commands worth knowing from day one:

- `git config --global init.defaultBranch main` — the default branch becomes `main`.
- `git config --global core.editor "code --wait"` — your default editor when Git needs you to write a message.

**Common mistake:** forgetting to set `user.email` → Git refuses to commit with "Please tell me who you are." The fix is simply running the commands above.

### The Core Loop: Status → Add → Commit

Understand three areas: the **working tree** (files on disk), **staging** (changes ready to be saved), and **commit** (changes recorded permanently).

```bash
git status              # see the situation: what changed?
git add <file>          # move a file into staging
git add .               # stage all changed files
git commit -m "message" # save staged changes as one commit
```

A real example — you just edited `data/blog.ts`:

```bash
git status
#   modified:   data/blog.ts
git add data/blog.ts
git commit -m "feat(blog): add git guide article"
```

The `type(scope): description` pattern (e.g. `fix(home): fix truncated heading`) is a widely used convention that keeps history readable for everyone.

### Viewing History and Changes

```bash
git log --oneline -5    # last 5 commits, compact
git show <commit>       # details of one commit
git diff                # unstaged changes
git diff --staged       # changes ready to be committed
```

### Don't Commit Everything at Once

`git add -p` lets you pick changes piece by piece, so a "fix typo" commit stays separate from an "add feature" commit. History stays clean — and three months from now, your future self will thank you.

### Ignoring Files (.gitignore)

Files like `node_modules/`, `.env`, and build output should **never** be committed. Create a `.gitignore` file:

```gitignore
node_modules/
.env
.next/
```

`.env` must not be committed because it can contain secrets (API tokens, passwords). If your project needs an example, create `.env.example` with variable names only, no values.

### Undoing Changes (Basics)

```bash
git restore <file>            # discard working tree changes
git restore --staged <file>   # unstage a file, keep its content
git revert <commit>           # a NEW commit that reverses an old one
```

`git revert` is safe for commits already pushed: the original commit stays in history, with a new commit on top that cancels it. This is the correct way to "undo" work on a shared repo — not by rewriting history.

### Your First Branch and Remote

A branch is a "parallel working lane." You can build a new feature without touching the main line.

```bash
git checkout -b feature-login     # create + switch to a new branch
git push -u origin feature-login  # push to GitHub, remember the link
```

- `-u` means subsequent commits only need `git push`.
- `git merge <branch>` merges another branch into the current one.

---

## Level 2 — Intermediate: Teamwork & a Clean History

### Merge vs Rebase

Both combine changes, but in different ways:

```bash
git merge main     # creates a "merge commit"; original history intact
git rebase main    # "moves" your commits on top of main; history is linear
```

| | `merge` | `rebase` |
|---|---|---|
| History | A merge commit appears (branches visible) | Linear, like sequential work |
| When to use | Public/shared branches | Private branches not yet pushed |

**Golden rule:** never rebase commits that are already pushed and used by others — you'll only create a chain of conflicts.

### Tidying History with rebase -i

Working on a feature often produces many messy small commits. Clean them up before pushing:

```bash
git rebase -i HEAD~5    # open an editor with the last 5 commits
```

In the editor, change each line's verb: `fixup` (merge into the commit above, keep its message), `squash` (merge and edit the combined message), `reword` (change the message).

### Cherry-Pick and Stash

```bash
git cherry-pick <commit>   # take ONE commit from another branch
git stash                  # save changes temporarily, tree becomes clean
git stash pop              # restore the saved changes
```

The classic `stash` situation: you're halfway through a feature when an urgent fix forces you to switch branches. Committing feels heavy — stash is the answer.

### Facing Conflicts

A conflict happens when two people change the same lines. Git can't decide who's right — you do. The problematic file contains markers:

```text
<<<<<<< HEAD
your version
=======
version from main
>>>>>>> main
```

The steps: open the file, keep one version (or combine both), remove the markers, then `git add <file>` and `git merge --continue`. If it gets messier, back out entirely with `git merge --abort`. Conflicts are normal — not the enemy.

### Syncing a Fork with Upstream

The pattern used when contributing to a forked repository:

```bash
git remote add upstream https://github.com/rohmansyah23/syahrworks-portfolio.git
git fetch upstream
git checkout main
git merge --ff-only upstream/main   # fast-forward only; refuses on divergence
git push origin main
```

`--ff-only` forces the merge to happen only if it can move straight ahead. If Git refuses, that's a signal you have local commits not yet merged — valuable information, not a dead end.

---

## Level 3 — Recovery: Git's First-Aid Kit

This level isn't for daily study. Keep it in mind as a lifesaver when something goes wrong.

### Reflog — Finding "Lost" Commits

The most common situation: you ran `git reset --hard` to an old commit, then realized a more recent commit is "gone." Stay calm — Git keeps a record of every HEAD movement for 90 days.

```bash
git reflog
# b455499 HEAD@{0}: commit: fix: stabilkan StackBackdrop
# d012bb7 HEAD@{1}: commit: fix: StackBackdrop tetap diam saat scroll
```

Recovery:

```bash
git checkout b455499
git checkout -b recovery-branch   # make it a branch so it's safe
```

As long as the SHA is still in the reflog, a "deleted" commit can always be restored.

### Bisect — Finding the Culprit Commit

A bug appears in the latest version, but you don't know which commit caused it:

```bash
git bisect start
git bisect bad            # current commit is broken
git bisect good <commit>  # last commit that was healthy
git bisect bad            # still broken? mark it again
git bisect good           # clean? mark it again
git bisect reset          # back to normal once found
```

Git halves the search space each time: with 200 commits, the culprit is found in at most 8 steps — not 200.

### Removing a File from History

Ever committed a `.env` containing a token? Deleting the file isn't enough — history still keeps it. The modern solution is `git-filter-repo`.

```bash
git filter-repo --path .env --invert-paths
git remote add origin <url>
git push --force origin main
```

Even after removal, **rotate every secret** that was ever exposed — assume it's leaked.

---

## Conclusion: Where to Start?

Git feels big, but you don't need to memorize everything. Start with Level 1: setup, then make `add`–`commit`–`push` a daily habit. Add branches and merges once you start working on separate features. And keep the Recovery chapter in mind — not to memorize, but to know that **nothing is truly lost in Git**.

**Learning tip:** create a practice repo, break it on purpose, then fix it. Git is the tool that makes you brave enough to experiment — because almost everything can be brought back.
