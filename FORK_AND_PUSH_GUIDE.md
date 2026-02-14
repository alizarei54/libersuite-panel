# Fork و Push کردن Libersuite Panel به GitHub شما

راهنمای گام به گام برای fork کردن و push کردن این مخزن ادغام‌شده به حساب GitHub خود.

## 📋 مرحله 1: Fork کردن مخزن اصلی

1. به [Libersuite Panel](https://github.com/omid-official/libersuite-panel) مراجعه کنید
2. دکمه **Fork** را در گوشه بالا سمت راست کلیک کنید
3. Fork به حساب GitHub شما ایجاد می‌شود

## 🔧 مرحله 2: آماده‌سازی برای Push

در دایرکتوری `libersuite-original`:

```bash
# تغییر origin به fork شما
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/libersuite-panel.git

# یا اگر از SSH استفاده می‌کنید
git remote add origin git@github.com:YOUR_USERNAME/libersuite-panel.git

# تأیید تغییرات
git remote -v
```

> **نکته**: `YOUR_USERNAME` را با نام کاربری GitHub خود جایگزین کنید!

## 📤 مرحله 3: Add و Commit فایل‌های جدید

```bash
# اضافه کردن تمام فایل‌های جدید و تغییر‌شده
git add .

# یا اگر می‌خواهید فقط web را اضافه کنید
git add web/ README.md PANEL_INTEGRATION.md

# Commit با پیام توضیحی
git commit -m "feat: add Next.js admin panel dashboard

- Add modern web dashboard for Libersuite Panel management
- Implement user management, traffic monitoring, and settings
- Support for Persian language (RTL)
- Responsive design with Tailwind CSS
- Mock APIs ready for integration with Go backend"
```

## 🚀 مرحله 4: Push به Fork؛

```bash
# Push به شاخه main
git push origin main

# یا اگر می‌خواهید یک شاخه جدید ایجاد کنید
git push -u origin feature/web-panel
```

## ✅ مرحله 5: ایجاد Pull Request (اختیاری)

اگر می‌خواهید تغییرات را به مخزن اصلی اضافه کنید:

1. به fork خود روی GitHub بروید
2. دکمه **Pull Request** را کلیک کنید
3. توضیحات اضافه کنید
4. **Create Pull Request** را کلیک کنید

## 🔄 Alternative: Clone مستقیم

اگر می‌خواهید از scratch شروع کنید:

```bash
# Clone مخزن تغییر یافته (یا خود fork کنید)
git clone https://github.com/omid-official/libersuite-panel.git
cd libersuite-panel

# یا fork خود
git clone https://github.com/YOUR_USERNAME/libersuite-panel.git
cd libersuite-panel
```

## 📦 نسخه‌گیری محلی

```bash
# تمام تغییرات محلی شما را Backup کنید
cd C:\Users\aliza\libersuite-original

# همه چیز را ZIP کنید
Compress-Archive -Path . -DestinationPath ..\libersuite-panel-backup.zip

# یا یک git bundle ایجاد کنید برای backup
git bundle create ../libersuite-panel.bundle --all
```

## 🛠️ Troubleshooting

### خطا: "origin پیش از این وجود دارد"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/libersuite-panel.git
```

### خطا: "Authentication failed"
```bash
# SSH setup کنید یا Personal Access Token استفاده کنید
# برای SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
# برای Token: https://docs.github.com/en/authentication/keeping-your-data-secure/creating-a-personal-access-token
```

### Branch مختلفی دارید؟
```bash
git branch -a  # دیدن تمام شاخه‌ها
git checkout main  # Switch به main
git push origin main
```

## 📝 Git Config

```bash
# نام و ایمیل خود را تنظیم کنید (اگر از قبل آن را انجام نداده‌اید)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🎯 خلاصه دستورات

```bash
# 1. تغییر origin
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/libersuite-panel.git

# 2. Commit و Push
git add .
git commit -m "feat: add web admin panel"
git push origin main
```

## 📚 منابع مفید

- [GitHub Fork Documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub CLI](https://cli.github.com/) - برای مدیریت سریع‌تر

---

اگر سؤالی دارید یا مشکلی پیش آمد، لطفاً نشانی (issue) را در مخزن اصلی باز کنید! 🚀
