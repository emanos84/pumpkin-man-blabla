# 🎃 Pumpkin-Man: The Halloween Maze

A Halloween-themed maze game inspired by Pac-Man mechanics. Built with vanilla JavaScript and HTML5 Canvas.

![Game Preview](https://img.shields.io/badge/Status-Beta-orange) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Quick Start: GitHub + Vercel Deployment

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and login
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository settings:
   - **Name**: `pumpkin-man` (or any name you like)
   - **Description**: `🎃 Halloween-themed maze game`
   - **Visibility**: Public (or Private)
   - ✅ Check "Add a README file" **NO** (we already have one)
   - Click **"Create repository"**

### Step 2: Upload Files to GitHub

You have 2 options:

#### Option A: Using Git Command Line (Recommended)

```bash
# 1. Navigate to the game folder
cd pumpkin-man

# 2. Initialize Git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "🎃 Initial commit - Pumpkin-Man game"

# 5. Set main branch
git branch -M main

# 6. Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 7. Push to GitHub
git push -u origin main
```

#### Option B: Upload via GitHub Web Interface

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL files:
   - `index.html`
   - `style.css`
   - `game.js`
   - `vercel.json`
   - `README.md`
   - `.gitignore`
3. Add commit message: `🎃 Initial commit`
4. Click **"Commit changes"**

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or Login if you have account)
3. Choose **"Continue with GitHub"** (recommended)
4. After login, click **"Add New..."** → **"Project"**
5. Click **"Import Git Repository"**
6. Find your `pumpkin-man` repository
7. Click **"Import"**
8. Project settings (keep defaults):
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
9. Click **"Deploy"** button
10. Wait 30-60 seconds ⏳
11. **🎉 DONE!** Your game is LIVE!

You'll get a URL like: `https://pumpkin-man.vercel.app`

### Step 4: Custom Domain (Optional)

To use `halloween.blablatoys.gr`:

1. In Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Add domain: `halloween.blablatoys.gr`
3. Vercel will show DNS records to add
4. Go to your domain provider and add the records:
   ```
   Type: CNAME
   Name: halloween
   Value: cname.vercel-dns.com
   ```
5. Wait 5-10 minutes for DNS propagation
6. Done! 🎃

### Step 5: Future Updates

Every time you want to update the game:

```bash
# Make your changes to the files
# Then:

git add .
git commit -m "✨ Description of changes"
git push

# Vercel will automatically deploy the new version!
```

## 🎮 Game Files

- `index.html` - Main game page
- `style.css` - Halloween-themed styling
- `game.js` - Core game logic
- `vercel.json` - Vercel configuration

## 📝 Custom Domain (Optional)

After deployment, you can add a custom domain like `halloween.blablatoys.gr`:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## 🎯 Game Controls

- **Arrow Keys** (↑ ↓ ← →) - Move player
- Collect all 🎃 pumpkins to win!
- Avoid running out of time (90 seconds)

## ✨ Features

- ✅ Smooth player movement
- ✅ Wall collision detection
- ✅ Score system
- ✅ Timer countdown
- ✅ Win/Loss conditions
- ✅ Halloween theme with glow effects
- ✅ Responsive design

## 🔜 Coming Soon

- 👻 Ghost enemies with AI
- 🍬 Power-ups (invincibility candy)
- 🦇 Flying bats
- 🔊 Sound effects
- 📊 Leaderboard

---

Made with 🎃 for BlaBla Toys
