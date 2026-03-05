# Linux Server Setup

A step-by-step guide to securing and managing a Linux server according to the roadmap.sh standards.

## User Setup

Create a non-root user with sudo privileges. This user should be used for all future server administration instead of root.

1. **Create User:** `sudo adduser deployer`
2. **Grant Sudo:** `sudo usermod -aG sudo deployer`
3. **Switch User:** `su - deployer`
4. **Verify:** `sudo whoami`

## SSH Configuration

Generate an SSH key pair on your local machine, add the public key to your server, and configure the server to disable password-based authentication.

1. **Generate Key (Local):** `ssh-keygen -t ed25519`
2. **Copy Key to Server:** `ssh-copy-id deployer@192.168.122.191`
3. **Disable Passwords:**
   - Edit config: `sudo nano /etc/ssh/sshd_config`
   - Set: `PasswordAuthentication no`
   - Restart: `sudo systemctl restart ssh`

## Firewall Configuration

Set up UFW (Uncomplicated Firewall) to allow only SSH (port 22) by default. You should understand how to add additional rules when needed.

1. **Allow SSH:** `sudo ufw allow ssh`
2. **Enable Firewall:** `sudo ufw enable`
3. **Check Status:** `sudo ufw status`

## System Updates

Update all system packages and configure automatic security updates using unattended-upgrades.

1. **Manual Update:** `sudo apt update && sudo apt upgrade -y`
2. **Auto-Updates:**
   - `sudo apt install unattended-upgrades`
   - `sudo dpkg-reconfigure -plow unattended-upgrades`
3. **Verify Timer:** `systemctl status apt-daily.timer`

## Basic Hardening

Install and configure Fail2Ban to protect against brute-force SSH attacks.

1. **Install:** `sudo apt install fail2ban`
2. **Check Status:** `sudo fail2ban-client status sshd`

## Server Configuration

Set the correct timezone and a meaningful hostname for your server.

1. **Set Hostname:** `sudo hostnamectl set-hostname roadmap-host`
2. **Set Timezone:** `sudo timedatectl set-timezone Asia/Istanbul`
3. **Verify:** `hostnamectl`

## Service Management

Demonstrate basic systemctl commands to check the status of services, start/stop them, and enable them at boot.

- **Status:** `sudo systemctl status <service>`
- **Control:** `start`, `stop`, `restart`, `reload`
- **Boot Behavior:** `enable`, `disable`

## Log Inspection

Use journalctl to view system logs and locate common log files in /var/log/.

- **Live Stream:** `journalctl -f`
- **Service Logs:** `sudo journalctl -u ssh`
- **Time Filter:** `journalctl --since "1 hour ago"`
- **Error Filter:** `sudo journalctl -p err..emerg -b`

## Verification

Complete a security checklist confirming all configurations are in place and working correctly.

- `grep "PasswordAuthentication" /etc/ssh/sshd_config`
- `sudo ufw status`
- `sudo fail2ban-client status sshd`
- `sudo systemctl status unattended-upgrades`
- `hostnamectl`
- `date`
