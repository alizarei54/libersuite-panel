# 🚀 دستورالعمل نهایی: Fork و Push Libersuite Panel

مخزن شما اکنون دارای پنل Next.js جدید است. برای push کردن این نسخه ادغام‌شده به GitHub:

## ⚡ دستورات سریع

```bash
# 1. تغییر remote (origin) به fork خود
cd C:\Users\aliza\libersuite-original
git remote remove origin
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/libersuite-panel.git

# 2. Commit تغییرات
git commit -m "feat: integrate Next.js admin panel dashboard"

# 3. Push به GitHub
git push -u origin main
```

## 📝 مراحل تفصیلی

### مرحله 1️⃣: Fork مخزن اصلی

1. به https://github.com/omid-official/libersuite-panel بروید
2. دکمه **Fork** را کلیک کنید (گوشه سمت راست)
3. یک کپی در حساب خود ایجاد می‌شود

### مرحله 2️⃣: تنظیم Git Remote

موقعیت‌اطلاعات remote را به fork خود تغییر دهید:

```bash
cd C:\Users\aliza\libersuite-original

# Remote موجود را مشاهده کنید
git remote -v

# حذف origin برای اتصال به fork خود
git remote remove origin

# اضافه کردن fork خود
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/libersuite-panel.git

# تأیید تغییرات
git remote -v
```

### مرحله 3️⃣: Commit نهایی

```bash
git add .
git commit -m "feat: integrate Next.js admin panel dashboard

- Add modern web dashboard for Libersuite Panel management
- Implement user management and traffic monitoring
- Support Persian language with RTL layout
- Responsive design with Tailwind CSS"
```

### مرحله 4️⃣: Push به GitHub

```bash
# Push به branch main
git push -u origin main

# اگر گیت می‌گوید 'main' وجود ندارد
git branch -m main  # نام برنامه را عوض کنید (اگر لازم باشد)
git push -u origin main
```

## 🔐 احراز هویت GitHub

اگر درخواست رمز/توکن کند:

### اختیار 1: Personal Access Token
1. به https://github.com/settings/tokens بروید
2. **Generate new token** کلیک کنید
3. `repo` scope را انتخاب کنید
4. Token را copy کنید و به عنوان رمز استفاده کنید

### اختیار 2: SSH Setup
```bash
# SSH key ایجاد کنید (اگر ندارید)
ssh-keygen -t ed25519 -C "your@email.com"

# Public key را کپی کنید
Get-Content ~/.ssh/id_ed25519.pub

# به https://github.com/settings/ssh بروید و اضافه کنید
# سپس از SSH remote استفاده کنید:
git remote add origin git@github.com:YOUR_USERNAME/libersuite-panel.git
```

## 📊 چه چیزی Push خواهی شد؟

```
📦 libersuite-panel (با پنل جدید)
├── 📁 web/                              [🆕 جدید]
│   ├── src/
│   │   ├── app/                        # صفحات و API routes
│   │   ├── components/                 # React components
│   │   └── types/                      # Types افراز
│   ├── public/                         # Static assets
│   ├── package.json
│   ├── README.md                       # راهنمای پنل
│   └── ... (Next.js config files)
├── cmd/                                 # Go backend (موجود)
├── crypto/
├── database/
├── dnsdispatcher/
├── sshserver/
├── README.md                            # بروزرسانی‌شده
├── PANEL_INTEGRATION.md                 [🆕 جدید]
├── FORK_AND_PUSH_GUIDE.md              [🆕 جدید]
└── ... (Go files)
```

## ✅ بررسی نهایی

```bash
# تأیید اینکه همه چیز آماده است
cd C:\Users\aliza\libersuite-original
git log --oneline -5        # دیدن آخرین commits
git remote -v               # تأیید origin
git status                  # باید "nothing to commit" نشان دهد
```

## 🎯 بعد از Push

1. به https://github.com/YOUR_USERNAME/libersuite-panel بروید
2. شاخه `main` را باید فایل‌های جدید نشان دهد
3. اختیاری: **Pull Request** به مخزن اصلی ایجاد کنید

## 🆘 مشکل داشتید؟

به `FORK_AND_PUSH_GUIDE.md` مراجعه کنید برای مشکلات رایج.

---

## 🎉 موفق‌ خواهید بود!

اگر سؤالی دارید:
- بخش Troubleshooting را مطالعه کنید
- `git status` را چک کنید
- `git log` را ببینید برای تأیید commits

**پنل شما اکنون آماده است! 🚀**
