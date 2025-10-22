# 📋 DEPLOYMENT GUIDE - Οδηγίες Ανάπτυξης

## 🎯 Στόχος
Να ανεβάσεις το Pumpkin-Man game στο GitHub και να το deploy-άρεις στο Vercel.

---

## 📦 ΤΙ ΧΡΕΙΑΖΕΣΑΙ

- [ ] GitHub account (δωρεάν) - [github.com](https://github.com)
- [ ] Vercel account (δωρεάν) - [vercel.com](https://vercel.com)
- [ ] Git installed στον υπολογιστή σου (προαιρετικό)

---

## 🚀 ΒΗΜΑ 1: Δημιούργησε GitHub Repository

### A. Πήγαινε στο GitHub
1. Άνοιξε [github.com](https://github.com)
2. Κάνε Login (ή Sign Up αν δεν έχεις account)

### B. Δημιούργησε νέο Repo
1. Κάνε click το **"+"** icon (πάνω δεξιά)
2. Επίλεξε **"New repository"**
3. Συμπλήρωσε:
   ```
   Repository name: pumpkin-man
   Description: 🎃 Halloween-themed maze game for BlaBla Toys
   Public ή Private: Public (recommended)
   
   ❌ ΜΗΝ τσεκάρεις "Add a README file"
   ❌ ΜΗΝ τσεκάρεις ".gitignore"
   ❌ ΜΗΝ επιλέξεις License
   ```
4. Κάνε click **"Create repository"**

### C. Κράτα το URL
Θα δεις κάτι σαν:
```
https://github.com/YOUR_USERNAME/pumpkin-man.git
```
**Αντίγραψέ το!** Θα το χρειαστείς.

---

## 📁 ΒΗΜΑ 2: Ανέβασε τα Αρχεία

### Τρόπος A: Με Git (Command Line) ⭐ RECOMMENDED

```bash
# 1. Άνοιξε Terminal/Command Prompt
# 2. Πήγαινε στον φάκελο pumpkin-man
cd path/to/pumpkin-man

# 3. Αρχικοποίησε Git
git init

# 4. Πρόσθεσε όλα τα αρχεία
git add .

# 5. Κάνε commit
git commit -m "🎃 Initial commit - Halloween game"

# 6. Όρισε το branch
git branch -M main

# 7. Σύνδεσε με το GitHub repo (βάλε το ΔΙΚΟ ΣΟΥ URL)
git remote add origin https://github.com/YOUR_USERNAME/pumpkin-man.git

# 8. Ανέβασε στο GitHub
git push -u origin main
```

**Αν σου ζητήσει username/password:**
- Username: το GitHub username σου
- Password: Χρησιμοποίησε **Personal Access Token** (όχι το κανονικό password)
  - Δημιούργησέ το από: GitHub → Settings → Developer settings → Personal access tokens

### Τρόπος B: Με Web Interface (Πιο εύκολο αλλά χειροκίνητο)

1. Στη σελίδα του repository σου, κάνε click: **"uploading an existing file"**
2. **Drag & Drop** ΟΛΑ τα αρχεία:
   - index.html
   - style.css
   - game.js
   - vercel.json
   - README.md
   - .gitignore
3. Στο commit message γράψε: `🎃 Initial commit`
4. Κάνε click **"Commit changes"**

---

## ☁️ ΒΗΜΑ 3: Deploy στο Vercel

### A. Σύνδεση με Vercel
1. Πήγαινε στο [vercel.com](https://vercel.com)
2. Κάνε click **"Sign Up"**
3. Επίλεξε **"Continue with GitHub"** ⭐ (recommended)
4. Authorize το Vercel να έχει access στο GitHub σου

### B. Import το Project
1. Στο Vercel dashboard, κάνε click **"Add New..."** → **"Project"**
2. Θα δεις τη λίστα με τα GitHub repos σου
3. Βρες το **"pumpkin-man"** repository
4. Κάνε click **"Import"**

### C. Configure & Deploy
1. **Project Settings:**
   ```
   Framework Preset: Other (ή αφήστε το στο default)
   Root Directory: ./
   Build Command: (αφήστε κενό)
   Output Directory: (αφήστε κενό)
   Install Command: (αφήστε κενό)
   ```

2. Κάνε click το μεγάλο μπλε κουμπί **"Deploy"**

3. Περίμενε 30-60 δευτερόλεπτα... ⏳

4. **🎉 SUCCESS!** Θα δεις:
   ```
   🎉 Congratulations!
   Your project is live at:
   https://pumpkin-man-xxxxx.vercel.app
   ```

### D. Κάνε click το URL και ΠΑΙΞΕ! 🎮

---

## 🌐 ΒΗΜΑ 4: Custom Domain (Προαιρετικό)

Αν θέλεις να χρησιμοποιήσεις `halloween.blablatoys.gr`:

### A. Στο Vercel
1. Πήγαινε στο project dashboard
2. Click **"Settings"** → **"Domains"**
3. Στο input field γράψε: `halloween.blablatoys.gr`
4. Click **"Add"**

### B. Vercel θα σου δείξει DNS records
```
Type: CNAME
Name: halloween
Value: cname.vercel-dns.com
TTL: 3600
```

### C. Στον Domain Provider σου (π.χ. Papaki, GoDaddy)
1. Login στο domain control panel
2. Πήγαινε στα DNS settings
3. Πρόσθεσε νέο **CNAME record**:
   ```
   Host/Name: halloween
   Points to: cname.vercel-dns.com
   TTL: 3600 (ή Auto)
   ```
4. Save changes

### D. Περίμενε
- DNS propagation: 5-30 λεπτά
- Μετά θα είναι live στο: `https://halloween.blablatoys.gr` 🎃

---

## 🔄 ΜΕΛΛΟΝΤΙΚΕΣ ΕΝΗΜΕΡΩΣΕΙΣ

Κάθε φορά που κάνεις αλλαγές:

```bash
# 1. Κάνε τις αλλαγές στα αρχεία
# 2. Μετά:

git add .
git commit -m "✨ Περιγραφή των αλλαγών"
git push

# Το Vercel θα κάνει automatically deploy τη νέα έκδοση!
# Σε 30-60 δευτερόλεπτα θα είναι live!
```

---

## ✅ CHECKLIST

Πριν το deployment:

- [ ] Όλα τα αρχεία είναι στον φάκελο (6 αρχεία)
- [ ] Το παιχνίδι δουλεύει local (άνοιξε index.html σε browser)
- [ ] Έχεις GitHub account
- [ ] Έχεις Vercel account
- [ ] Έχεις δημιουργήσει το GitHub repository
- [ ] Τα αρχεία ανέβηκαν στο GitHub
- [ ] Έκανες import στο Vercel
- [ ] Το deployment ολοκληρώθηκε
- [ ] Το game δουλεύει στο Vercel URL

---

## 🆘 TROUBLESHOOTING

**Πρόβλημα: "Git not found"**
- Λύση: Εγκατάστησε το Git από [git-scm.com](https://git-scm.com)

**Πρόβλημα: "Permission denied" στο git push**
- Λύση: Χρησιμοποίησε Personal Access Token αντί για password

**Πρόβλημα: "Deployment failed" στο Vercel**
- Λύση: Βεβαιώσου ότι όλα τα 6 αρχεία υπάρχουν στο GitHub

**Πρόβλημα: Custom domain δεν δουλεύει**
- Λύση: Περίμενε 24 ώρες για DNS propagation

---

## 📞 SUPPORT

- GitHub Docs: [docs.github.com](https://docs.github.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Git Tutorial: [git-scm.com/doc](https://git-scm.com/doc)

---

**Καλή επιτυχία! 🎃👻**
