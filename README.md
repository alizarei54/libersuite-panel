<div align="center">

# Libersuite Panel - پنل لیبرسوئیت

**An SSH & dnstt tunnel management service built with Go & Next.js**

**سرویس مدیریت تونل‌های SSH و dnstt با رابط‌کاربری وب مدرن**

[![License](https://img.shields.io/github/license/alizarei54/libersuite-panel)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/alizarei54/libersuite-panel)](https://github.com/alizarei54/libersuite-panel/stargazers)
[![Issues](https://img.shields.io/github/issues/alizarei54/libersuite-panel)](https://github.com/alizarei54/libersuite-panel/issues)

</div>

---

## 🎯 About | درباره پروژه

**English:**

Libersuite Panel is an SSH and dnstt tunnel management service designed to simplify the administration of SSH/dnstt servers. Now with a modern web admin dashboard built with Next.js for easy management through your browser!

**فارسی:**

پنل مدیریتی لیبرسوئیت یک سرویس جامع برای مدیریت تونل‌های SSH و dnstt است که اکنون با یک داشبورد مدیریتی مدرن و کاربرپسند توسعه یافته است.

---

## ✨ Features | ویژگی‌ها

### Backend (Go)
- 🔌 SSH tunnel management | مدیریت تونل‌های SSH
- 🌐 DNSTT tunnel support | پشتیبانی از تونل‌های DNSTT
- 👥 User management system | سیستم مدیریت کاربران
- 📊 Traffic monitoring | نظارت بر ترافیک
- ⏰ Subscription expiry control | کنترل تاریخ انقضا

### Web Admin Panel (Next.js)
- 📱 Responsive dashboard | داشبورد واکنش‌پذیر
- 🎨 Modern UI with Tailwind CSS | رابط‌کاربری مدرن
- 🇮🇷 Persian language support (RTL) | پشتیبانی کامل فارسی
- 👤 User CRUD operations | عملیات کامل مدیریت کاربران
- 📈 Real-time statistics | آمار لحظه‌ای
- 🔧 Server configuration | پیکربندی سرور
- 🔐 Secure authentication | احراز هویت امن

---

## 🚀 Quick Start | شروع سریع

### Option 1: Automated Installation (Recommended) | نصب خودکار (توصیه شده)

**Linux/macOS:**
```bash
bash <(curl -Ls https://raw.githubusercontent.com/alizarei54/libersuite-panel/main/install.sh)
```

**With Persian language:**
```bash
bash <(curl -Ls https://raw.githubusercontent.com/alizarei54/libersuite-panel/main/install.sh) fa
```

**Installation automatically:**
- ✅ Checks and installs prerequisites (Node.js, npm, Go, Git)
- ✅ Clones the repository from GitHub
- ✅ Installs web panel dependencies
- ✅ Builds the Go backend

**نصب خودکار موارد زیر را انجام می‌دهد:**
- ✅ بررسی و نصب پیش‌نیازها
- ✅ دانلود مخزن
- ✅ نصب وابستگی‌های پنل وب
- ✅ ساخت Backend

### Option 2: Manual Installation | نصب دستی

**Prerequisites | پیش‌نیازها:**
- Node.js 18+
- npm or yarn
- Go 1.20+
- Git

**Installation steps | مراحل نصب:**

```bash
# Clone repository
git clone https://github.com/alizarei54/libersuite-panel.git
cd libersuite-panel

# Install web panel
cd web
npm install
npm run dev

# In another terminal, build backend
cd ..
go mod download
go build -o libersuite ./cmd
./libersuite start
```

---

## 📋 Project Structure | ساختار پروژه

```
libersuite-panel/
├── 📁 web/                           # Next.js Admin Panel
│   ├── src/
│   │   ├── app/                     # Pages & API routes
│   │   ├── components/              # React components
│   │   └── types/                   # TypeScript types
│   ├── package.json
│   └── README.md
├── 📁 cmd/                          # Go CLI commands
├── 📁 crypto/                       # Cryptography utilities
├── 📁 database/                     # Database modules
├── 📁 dnsdispatcher/                # DNS dispatcher
├── 📁 sshserver/                    # SSH server
├── 📄 README.md                     # This file
└── go.mod / go.sum                  # Go dependencies
```

---

## 🌐 Accessing the Panel | دسترسی به پنل

After installation:

**Admin Dashboard | داشبورد مدیریتی:**
```
http://localhost:3000
```

**Backend API | API Backend:**
```
http://localhost:8080 (default)
```

---

## 📖 Usage | نحوه استفاده

### Start Web Panel | راه‌اندازی پنل وب

```bash
cd web
npm run dev
```

Visit: http://localhost:3000

### Start Backend | راه‌اندازی Backend

```bash
./libersuite start
```

### Build for Production | ساخت برای تولید

**Web Panel:**
```bash
cd web
npm run build
npm run start
```

**Backend:**
```bash
go build -o libersuite ./cmd
./ libersuite start
```

---

## 🔧 Configuration | پیکربندی

### Environment Variables | متغیرهای محیطی

Create `.env.local` in `web/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_LIBERSUITE_API=http://localhost:8080
```

---

## 🛡️ Security | امنیت

⚠️ **Before deploying to production | قبل استقرار در محیط تولید:**

- [ ] Implement user authentication | پیاده‌سازی احراز هویت
- [ ] Enable HTTPS/TLS | فعال‌سازی HTTPS
- [ ] Set strong database passwords | تعیین رمزهای قوی
- [ ] Configure firewall rules | پیکربندی فایروال
- [ ] Regular backups | پشتیبان‌گیری منظم
- [ ] Keep dependencies updated | بروزرسانی وابستگی‌ها

---

## 📝 API Documentation | مستندات API

### User Management | مدیریت کاربران

```bash
# Get all users
GET /api/clients

# Create new user
POST /api/clients
Content-Type: application/json
{
  "username": "user123",
  "password": "pass123",
  "trafficLimitGb": 100,
  "expiresInDays": 30
}

# Get specific user
GET /api/clients/{id}

# Update user
PATCH /api/clients/{id}

# Delete user
DELETE /api/clients/{id}

# Enable/Disable user
POST /api/clients/{id}/enable
POST /api/clients/{id}/disable
```

### Server Statistics | آمار سرور

```bash
# Get server stats
GET /api/stats
```

---

## 🐛 Troubleshooting | حل مشکلات

### Port already in use | درگاه در حال استفاده است

```bash
# Use different port for web panel
cd web
npm run dev -- -p 3001
```

### Build errors | خطاهای ساخت

```bash
# Clear cache
rm -rf web/.next web/node_modules
npm install
npm run build
```

### Backend not starting | Backend شروع نمی‌شود

```bash
# Check if port 8080 is available
lsof -i :8080

# Use different port
./libersuite start --port 8081
```

---

## 🤝 Contributing | مشارکت

Contributions are welcome! Feel free to:

**مشارکت خوش‌آمد است! می‌توانید:**

- Report bugs | گزارش باگ‌ها
- Suggest features | پیشنهاد ویژگی‌ها
- Submit pull requests | ارسال Pull Request
- Improve documentation | بهبود مستندات

---

## 📄 License | مجوز

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author | نویسنده

**alizarei54**
- GitHub: [@alizarei54](https://github.com/alizarei54)
- Repository: [libersuite-panel](https://github.com/alizarei54/libersuite-panel)

---

## 📞 Support | پشتیبانی

- 🐛 [Report Issues](https://github.com/alizarei54/libersuite-panel/issues)
- 📚 [Documentation](./README.md)
- 💬 [Discussions](https://github.com/alizarei54/libersuite-panel/discussions)

---

## 🙏 Acknowledgments | تشکرات

Based on the original [Libersuite Panel](https://github.com/omid-official/libersuite-panel) project by omid-official.

---

<div align="center">

**⭐ If you find this project useful, please consider starring it! | اگر این پروژه را مفید یافتید، لطفاً ستاره بدهید! ⭐**

</div>

### DNS Configuration

Before installing, you need to configure your DNS records. This step is required for **dnstt** to function properly.

**Example DNS Configuration:**

1. Create an A record:
   ```
   A    tns.example.com    1.2.3.4
   ```

2. Create an NS record:
   ```
   NS   t.example.com      tns.example.com
   ```

Replace `example.com` with your actual domain and `1.2.3.4` with your server's IP address.

### Make Sure Port 53 is Free

On some servers, port 53 is occupied by `systemd-resolved`. To make sure port 53 is free and available for Libersuite Panel, follow these steps:

1. **Edit `/etc/systemd/resolved.conf`:**

   Open the configuration file in a text editor:
   ```bash
   sudo nano /etc/systemd/resolved.conf
   ```

    - If you see a line like `DNSStubListener=yes`, **change it to**:
      ```
      DNSStubListener=no
      ```
    - You can also add or set an upstream DNS server (such as Cloudflare’s DNS):
      ```
      DNS=1.1.1.1
      ```

2. **Update `/etc/resolv.conf`:**

   Replace the default resolv.conf with a symlink to systemd’s configuration:
   ```bash
   sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
   ```

3. **Restart systemd-resolved for the changes to take effect:**
   ```bash
   sudo systemctl restart systemd-resolved
   ```

### Quick Install

Once your DNS is configured, install Libersuite Panel with a single command:

```bash
bash <(curl -Ls https://raw.githubusercontent.com/omid-official/libersuite-panel/master/install.sh)
```

## Usage
### Basic Commands

```bash
# Start the panel
libersuite start

# Stop the panel
libersuite stop

# Restart the panel
libersuite restart

# View logs
libersuite logs
```

### Client Management Commands
Libersuite provides commands to manage SSH VPN clients from your terminal:

```bash
# Add a new client
libersuite client add <username> <password> [traffic_limit_gb] [expires_in_days]

# List all clients
libersuite client list

# Remove a client
libersuite client remove <username>

# Enable a client
libersuite client enable <username>

# Disable a client
libersuite client disable <username>

# Export client config URLs (SSH & dnstt)
libersuite client export <username> <server_ip>
```

#### Command Descriptions

- **client add**: Adds a new client with optional traffic-limit (in GB) and expiration (in days).
- **client list**: Lists all existing clients with their status, expiry, and usage.
- **client remove**: Removes the specified client.
- **client enable**: Enables a disabled client.
- **client disable**: Disables a client.
- **client export**: Outputs SSH and DNSTT config URLs for the specified client.

Example to add a client with a 10GB traffic limit, valid for 30 days:
```bash
libersuite client add someone password123 10 30
```
Example to export a client config:
```bash
libersuite client export someone server_ip
```

### Client
You can use `NetMod` client.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a PR.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
- If you find this project useful, please consider starring the repository ⭐