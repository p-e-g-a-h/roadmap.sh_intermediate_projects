# Caching Proxy CLI

Project Challenge: [roadmap.sh - Caching Proxy CLI](https://roadmap.sh/projects/caching-server)

A CLI tool that acts as a caching proxy server. It forwards requests to an origin server and caches the responses in Redis to improve performance for subsequent requests.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/Backend Projects/Caching Proxy CLI"
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

Use the caching-proxy command to start the server or manage the cache.

**Basic Commands**

| Action       | Command                                                   |
| ------------ | --------------------------------------------------------- |
| Start Proxy  | `caching-proxy --port 3000 --origin http://dummyjson.com` |
| View Popular | `caching-proxy clear-cache`                               |

**Testing the Cache**

When you make a request to your proxy, check the headers to see if it was a cache hit or miss:

```bash
curl -I http://localhost:3000/products
```

- `X-Cache: MISS`: Data was fetched from the origin server.
- `X-Cache: HIT`: Data was retrieved from Redis.
