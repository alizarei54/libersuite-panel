# Libersuite Panel - Web Admin Dashboard | پنل مدیریتی وب

A modern, responsive web-based admin panel for managing Libersuite Panel SSH/dnstt tunnel services. Built with Next.js, TypeScript, and Tailwind CSS.

یک پنل مدیریتی مدرن و قدرتمند برای مدیریت تونل‌های SSH و dnstt.

## Features | ویژگی‌ها

### Dashboard
- 📊 Real-time server statistics | آمار لحظه‌ای سرور
- 👥 Total and active user counts | تعداد کاربران فعال و کل
- 📈 System resource monitoring (CPU, Memory) | نظارت منابع سیستم
- 🟢 DNS port status | وضعیت درگاه DNS
- ⏱️ Server uptime tracking | آپ‌تایم سرور
- 📡 Total traffic usage | کل ترافیک مصرف‌شده

### User Management
- ➕ Create new users with custom traffic limits | ایجاد کاربر با محدودیت ترافیک
- 📝 Edit user details | ویرایش جزئیات کاربر
- 🗑️ Delete users | حذف کاربران
- 🔄 Enable/disable user accounts | فعال/غیرفعال کردن حساب‌ها
- 🔍 Search and filter users | جستجو و فیلتر کاربران
- 📊 View per-user traffic statistics | مشاهده آمار ترافیک

### Settings
- ⚙️ Panel configuration | تنظیمات پنل
- 🖥️ Server settings | تنظیمات سرور
- 📋 Default values | مقادیر پیش‌فرض
- 🔔 Notification preferences | ترجیحات اعلان
- 🔐 Security settings | تنظیمات امنیتی

## Technology Stack

- **Next.js 16** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Modern date utilities
- **ESLint** - Code quality

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

## Running the Web Panel

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard
│   │   ├── clients/page.tsx      # User Management
│   │   ├── settings/page.tsx     # Settings
│   │   ├── api/                  # API Routes
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   ├── types/                    # TypeScript types
│   └── README.md                 # Component docs
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── eslint.config.mjs
```

## API Endpoints

### User Management
- `GET /api/clients` - List all users
- `POST /api/clients` - Create user
- `GET /api/clients/[id]` - Get user
- `PATCH /api/clients/[id]` - Update user
- `DELETE /api/clients/[id]` - Delete user
- `POST /api/clients/[id]/enable` - Enable user
- `POST /api/clients/[id]/disable` - Disable user

### Statistics
- `GET /api/stats` - Get server stats

## Integration with Go Backend

Currently uses mock data. To integrate with Libersuite Go backend:

1. Update API URLs in `src/app/api/`
2. Add authentication (JWT/Sessions)
3. Connect to Go backend database
4. Enable WebSocket for real-time updates

## Persian Language Support (پشتیبانی فارسی)

- Full RTL (Right-to-Left) support
- All UI in Persian
- Persian number formatting
- Persian date displays

## Security Notes

Before production deployment:
- ✅ Implement authentication
- ✅ Add CSRF protection
- ✅ Validate all inputs
- ✅ Use HTTPS
- ✅ Implement rate limiting
- ✅ Add authorization checks

## Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_LIBERSUITE_API=http://localhost:8080
```

## Troubleshooting

**Port already in use:**
```bash
npm run dev -- -p 3001
```

**Build errors:**
```bash
rm -rf .next && npm run build
```

**Module errors:**
```bash
rm -rf node_modules package-lock.json && npm install
```

## Contributing

Contributions welcome! See main [Libersuite Panel](https://github.com/omid-official/libersuite-panel) repository.

## License

MIT License - Part of Libersuite Panel

---

**Built with ❤️ for Libersuite Panel**
