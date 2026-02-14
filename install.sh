#!/bin/bash

# Libersuite Panel - Automated Installer
# پنل مدیریتی لیبرسوئیت - نصب‌کننده خودکار
# by alizarei54
# https://github.com/alizarei54/libersuite-panel

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get system language
LANG_CHOICE=${1:-auto}
if [[ "$LANG_CHOICE" == "auto" ]]; then
    # Auto-detect language
    if [[ "$LANG" =~ ^fa || "$(locale language 2>/dev/null || echo "")" =~ fa ]]; then
        LANG_CHOICE="fa"
    else
        LANG_CHOICE="en"
    fi
fi

# Messages - Persian/Farsi
if [[ "$LANG_CHOICE" == "fa" ]]; then
    MSG_WELCOME="خوش‌آمدید به نصب‌کننده پنل مدیریتی Libersuite"
    MSG_CHECKING="🔍 بررسی پیش‌نیازها..."
    MSG_INSTALLING="درحال نصب"
    MSG_INSTALLED="✓ نصب شده"
    MSG_NOT_FOUND="✗ یافت نشد"
    MSG_INSTALL_NODE="نصب Node.js..."
    MSG_INSTALL_NPM="نصب npm..."
    MSG_INSTALL_GO="نصب Go..."
    MSG_INSTALL_GIT="نصب Git..."
    MSG_CLONE_REPO="📥 دانلود مخزن..."
    MSG_INSTALL_WEB="📦 نصب پنل وب..."
    MSG_BUILD_BACKEND="⚙️ ساخت Backend..."
    MSG_SUCCESS="✅ نصب با موفقیت انجام شد!"
    MSG_START="🚀 برای شروع استفاده:"
    MSG_PANEL="📊 پنل مدیریتی (Web Admin):"
    MSG_BACKEND="🔧 Backend (Go Server):"
    MSG_DOCS="📚 مستندات:"
    MSG_SUPPORT="💬 پشتیبانی:"
    MSG_CONFIRM="آیا تایید می‌کنید؟ (y/n)"
else
    # English messages
    MSG_WELCOME="Welcome to Libersuite Panel Installer"
    MSG_CHECKING="🔍 Checking prerequisites..."
    MSG_INSTALLING="Installing"
    MSG_INSTALLED="✓ Installed"
    MSG_NOT_FOUND="✗ Not found"
    MSG_INSTALL_NODE="Installing Node.js..."
    MSG_INSTALL_NPM="Installing npm..."
    MSG_INSTALL_GO="Installing Go..."
    MSG_INSTALL_GIT="Installing Git..."
    MSG_CLONE_REPO="📥 Downloading repository..."
    MSG_INSTALL_WEB="📦 Installing web panel..."
    MSG_BUILD_BACKEND="⚙️ Building backend..."
    MSG_SUCCESS="✅ Installation completed successfully!"
    MSG_START="🚀 To get started:"
    MSG_PANEL="📊 Admin Panel (Web):"
    MSG_BACKEND="🔧 Backend (Go Server):"
    MSG_DOCS="📚 Documentation:"
    MSG_SUPPORT="💬 Support:"
    MSG_CONFIRM="Do you confirm? (y/n)"
fi

# Print header
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║  ${GREEN}$MSG_WELCOME${BLUE}  ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check OS
if [[ ! "$OSTYPE" =~ ^linux || "$OSTYPE" =~ ^darwin ]]; then
    echo -e "${RED}✗ This script only works on Linux/macOS${NC}"
    echo -e "${YELLOW}For Windows, please use WSL2 or install manually.${NC}"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js
install_nodejs() {
    echo -e "${YELLOW}→ $MSG_INSTALL_NODE${NC}"
    
    if [[ "$OSTYPE" =~ linux ]]; then
        if command_exists apt-get; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command_exists dnf; then
            sudo dnf install -y nodejs npm
        elif command_exists yum; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs
        fi
    elif [[ "$OSTYPE" =~ darwin ]]; then
        if command_exists brew; then
            brew install node
        else
            echo -e "${RED}Please install Homebrew first: https://brew.sh${NC}"
            exit 1
        fi
    fi
}

# Function to install Go
install_go() {
    echo -e "${YELLOW}→ $MSG_INSTALL_GO${NC}"
    
    GO_VERSION="1.21.3"
    
    if [[ "$OSTYPE" =~ linux ]]; then
        wget -q https://go.dev/dl/go$GO_VERSION.linux-amd64.tar.gz -O /tmp/go.tar.gz
        sudo tar -C /usr/local -xzf /tmp/go.tar.gz
        rm /tmp/go.tar.gz
        echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
        source ~/.bashrc
    elif [[ "$OSTYPE" =~ darwin ]]; then
        wget -q https://go.dev/dl/go$GO_VERSION.darwin-amd64.tar.gz -O /tmp/go.tar.gz
        sudo tar -C /usr/local -xzf /tmp/go.tar.gz
        rm /tmp/go.tar.gz
        echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc
        source ~/.zshrc
    fi
}

# Function to install Git
install_git() {
    echo -e "${YELLOW}→ $MSG_INSTALL_GIT${NC}"
    
    if [[ "$OSTYPE" =~ linux ]]; then
        if command_exists apt-get; then
            sudo apt-get update && sudo apt-get install -y git
        elif command_exists dnf; then
            sudo dnf install -y git
        elif command_exists yum; then
            sudo yum install -y git
        fi
    elif [[ "$OSTYPE" =~ darwin ]]; then
        if command_exists brew; then
            brew install git
        fi
    fi
}

echo -e "${BLUE}$MSG_CHECKING${NC}"
echo ""

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js $MSG_NOT_FOUND${NC}"
    install_nodejs
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm $MSG_NOT_FOUND${NC}"
    install_nodejs
fi

# Check Go
if command_exists go; then
    GO_VERSION=$(go version | awk '{print $3}')
    echo -e "${GREEN}✓ Go $GO_VERSION${NC}"
else
    echo -e "${RED}✗ Go $MSG_NOT_FOUND${NC}"
    install_go
fi

# Check Git
if command_exists git; then
    GIT_VERSION=$(git --version | awk '{print $3}')
    echo -e "${GREEN}✓ Git $GIT_VERSION${NC}"
else
    echo -e "${RED}✗ Git $MSG_NOT_FOUND${NC}"
    install_git
fi

echo ""

# Clone repository
echo -e "${YELLOW}$MSG_CLONE_REPO${NC}"
INSTALL_DIR="${HOME}/libersuite-panel"

if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}📂 Directory exists. Updating...${NC}"
    cd "$INSTALL_DIR"
    git fetch origin
    git reset --hard origin/main
else
    git clone https://github.com/alizarei54/libersuite-panel.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

echo ""

# Install web panel
echo -e "${YELLOW}$MSG_INSTALL_WEB${NC}"
cd "$INSTALL_DIR/web"
if [ -f "package.json" ]; then
    npm install
else
    echo -e "${RED}package.json not found in web directory${NC}"
    exit 1
fi

echo ""

# Build backend
echo -e "${YELLOW}$MSG_BUILD_BACKEND${NC}"
cd "$INSTALL_DIR"
if [ -f "go.mod" ]; then
    go mod download
    go build -o libersuite ./cmd
else
    echo -e "${RED}go.mod not found${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║  $MSG_SUCCESS          ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}$MSG_START${NC}"
echo ""
echo -e "${YELLOW}1️⃣  $MSG_PANEL${NC}"
echo "   cd $INSTALL_DIR/web"
echo "   npm run dev"
echo "   🌐 ${BLUE}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}2️⃣  $MSG_BACKEND${NC}"
echo "   cd $INSTALL_DIR"
echo "   ./libersuite start"
echo ""
echo -e "${BLUE}$MSG_DOCS${NC}"
echo "   $INSTALL_DIR/README.md"
echo ""
echo -e "${BLUE}$MSG_SUPPORT${NC}"
echo "   🔗 https://github.com/alizarei54/libersuite-panel/issues"
echo ""

mkdir -p "$DNSTT_DIR" "$LIBER_DIR"

echo "[+] Downloading dnstt..."
cd "$DNSTT_DIR"
curl -L "$DNSTT_URL" -o dnstt-server-linux-amd64
chmod +x dnstt-server-linux-amd64

echo "[+] Generating a dsntt key pair"
cd "$DNSTT_DIR"
./dnstt-server-linux-amd64 -gen-key -privkey-file server.key -pubkey-file server.pub

echo "[+] Installing dnstt service..."

sudo tee /etc/systemd/system/dnstt.service > /dev/null <<EOF
[Unit]
Description=DNSTT Service
After=network.target

[Service]
ExecStart=$DNSTT_DIR/dnstt-server-linux-amd64 -udp 127.0.0.1:$DNSTT_PORT -privkey-file $DNSTT_DIR/server.key $DOMAIN 127.0.0.1:$LIBERSUITE_PORT
Restart=always
User=$RUN_USER
WorkingDirectory=$DNSTT_DIR

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable dnstt
sudo systemctl start dnstt

echo "[+] Downloading libersuite..."
cd "$LIBER_DIR"
curl -L "$LIBERSUITE_URL" -o panel
chmod +x panel

echo "[+] Installing libersuite panel service..."
sudo tee /etc/systemd/system/libersuite.service > /dev/null <<EOF
[Unit]
Description=Libersuite Panel Service
After=network.target

[Service]
Type=simple
ExecStart=$LIBER_DIR/panel server --port $LIBERSUITE_PORT --dns-domain $DOMAIN --dnstt-addr 127.0.0.1:$DNSTT_PORT
Restart=always
RestartSec=3
User=$RUN_USER
WorkingDirectory=$LIBER_DIR

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable libersuite
sudo systemctl restart libersuite

echo "[+] Downloading libersuite.sh..."
curl -L "$LIBERSUITE_SH_URL" -o "$LIBER_DIR/libersuite"

chmod +x "$LIBER_DIR/libersuite"

if ! grep -q 'export PATH="$HOME/libersuite/libersuite:$PATH"' "$BASHRC"; then
  echo "[+] Adding libersuite to PATH in ~/.bashrc"
  {
    echo ""
    echo "# Added by libersuite installer"
    echo 'export PATH="$HOME/libersuite/libersuite:$PATH"'
  } >> "$BASHRC"
fi

# Apply PATH change immediately for current session
export PATH="$HOME/libersuite/libersuite:$PATH"

echo "libersuite.sh installed"

echo "[+] Saving config..."
cat > "$CONF_FILE" <<EOF
DOMAIN="$DOMAIN"
DNSTT_PORT="$DNSTT_PORT"
LIBERSUITE_PORT="$LIBERSUITE_PORT"
EOF


echo "[+] Done."