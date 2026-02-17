# Broadcast Server CLI

Project Challenge: [roadmap.sh - Broadcast Server](https://roadmap.sh/projects/broadcast-server)

A real-time chat tool for your terminal. It uses Socket.io for instant messaging and node:readline to handle your typing. One server acts as the hub, sending messages from one person to everyone else.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_intermediate_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/Broadcast Server"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Link the command globally:**

```bash
npm link --force
```

## Usage

Use the server command to host the chat, and the connect command to join it.

**Basic Commands**

| Action           | Command                    |
| ---------------- | -------------------------- |
| Start the Server | `broadcast-server start`   |
| Join as a Client | `broadcast-server connect` |

**How to Test**

To see the broadcast in action, open multiple terminal windows:

1. Terminal 1: Start the server using `broadcast-server start`.
2. Terminal 2: Connect a client using `broadcast-server connect`.
3. Terminal 3: Connect another client using `broadcast-server connect`.
4. Chat: Type a message in Terminal 2 and press Enter. You will see the message appear instantly in Terminal 3!
