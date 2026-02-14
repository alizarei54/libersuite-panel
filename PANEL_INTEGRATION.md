# Libersuite Panel | Panel Integration Guide

This repository contains both the Go backend server and the Next.js web admin panel.

## 📁 Directory Structure

```
libersuite-panel/
├── cmd/                      # Go command implementations
├── crypto/                   # Cryptography utilities
├── database/                 # Database handling
├── dnsdispatcher/            # DNS dispatcher
├── sshserver/                # SSH server implementation
├── web/                      # 🆕 Next.js Admin Dashboard
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── install.sh                # Installation script
├── libersuite.sh             # Main shell script
├── go.mod / go.sum           # Go dependencies
└── README.md                 # Main documentation
```

## 🎯 Quick Start

### Backend (Go Server)

```bash
# Install dependencies
go mod download

# Build
go build -o libersuite ./cmd/main.go

# Run
./libersuite start
```

### Frontend (Web Admin Panel)

```bash
cd web

# Install dependencies
npm install

# Development
npm run dev

# Production
npm run build
npm run start
```

## 🌐 Accessing the Panel

- **Admin Dashboard**: http://localhost:3000
- **Go Backend API**: http://localhost:8080 (default)

## 📝 Notes

- The web panel is located in the `web/` directory
- Currently uses mock data for development
- To integrate with Go backend, update API URLs in `web/src/app/api/`
- See `web/README.md` for detailed panel documentation

## 🔗 Integration

The web panel provides a modern UI for managing:
- Users and SSH/DNSTT clients
- Server statistics and monitoring
- Configuration and settings

See `web/README.md` for integration details with the Go backend.
