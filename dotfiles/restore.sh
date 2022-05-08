sudo apt update
sudo apt upgrade
sudo apt install git curl wget tmux make pip
sudo apt install build-essential
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
chmod u+x nvim.appimage
./nvim.appimage --appimage-extract
./squashfs-root/AppRun --version

sudo mv squashfs-root /
sudo ln -s /squashfs-root/AppRun /usr/bin/nvim
echo "installed nvim"

echo "installing nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 16.13.0

bash <(curl -s https://raw.githubusercontent.com/lunarvim/lunarvim/master/utils/installer/install.sh)

echo "installing nerd fonts"
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/CodeNewRoman.zip

echo "installing gcc"
sudo apt-get install gcc

echo "Installing rustup"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

echo "installing asus ctl for g14"
sudo apt install libclang-dev libudev-dev
git clone -b 3.7.2 https://gitlab.com/asus-linux/asusctl.git
cd asusctl
make
sudo make install

sudo add-apt-repository ppa:pipewire-debian/pipewire-upstream
sudo apt install pipewire
sudo apt install libspa-0.2-bluetooth

sudo apt install mesa-va-drivers

sudo apt --fix-broken install

sudo apt install valac libgranite-dev libpackagekit-glib2-dev libunity-dev meson ninja-build libzeitgeist-2.0-dev gettext


curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -fsSL https://deno.land/install.sh | sh
