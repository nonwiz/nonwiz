---
title: git hooks > build
pinned: false
tags:
  - git
draft: false
category: post
type: post
date:
---
So, on my site, I often mess around with static site generators. For now, I'm really digging lume.land (which uses Deno). It's been smooth sailing with Vercel until recently, when suddenly, my builds started failing.

Man, I wasted _so_ much time trying to fix it – retrying builds, messing with build commands, you name it. But, silver lining! As a total Git n00b, I stumbled upon git hooks. So, I ended up just making a pre-commit hook that generates all my HTML files _before_ I even commit them. This is awesome because now I can completely skip the build step on Vercel! (ヽ(。_°)ノ)

If you're thinking of doing something similar, here's how: Just create a file in your repo at `.git/hooks/pre-commit` and drop in the following content:
```bash
#!/bin/sh
set -e
/Users/ur_user/.deno/bin/deno task build
git add _site/*
exit 0
```
save it and `chmod +x filepath` to allow it to executable. I had to use full path for my obsidian git to work (not gonna spend more time debuggin that too (╯°□°)╯︵ ┻━┻)
