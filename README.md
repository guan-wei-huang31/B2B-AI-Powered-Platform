# Hackathon 2025 Project

## 🚀 Project Overview

Welcome to our `Hackathon 2025` project! This innovative solution was developed during an intense hackathon, showcasing cutting-edge technology and creative problem-solving.

## 🛠 Tech Stack

Frontend:

- TypeScript
- React.js + Vite
- HMR (Hot Module Replacement)
- ESLint

Backend:

- TypeScript
- Node.js
- Express
- Zod
- OpenAPI
- Pino (logger)

### 🔧 Development Tools

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  - Uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  - Uses [SWC](https://swc.rs/) for Fast Refresh

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/ting850911/hackthon2025.git
cd hackthon2025
```

2. Install dependencies

```bash
pnpm install
```

## 🚀 Running frontend project

### Development Mode

```bash
pnpm -F web run dev
```

- Starts the development server
- Enables Hot Module Replacement (HMR)
- Opens the app in your default browser

### Build for Production

```bash
pnpm -F web run build
```

- Compiles and minifies for production
- Generates optimized static files

### More useful commands

```bash
pnpm -F web run lint       # check lint
pnpm -F web run lint:fix   # check and fix lint
pnpm -F web run test       # run test
```

## 🗿 Running backend project

### Setup Environment Variables

- Create .env: Copy .env.example to .env
- Update .env: Fill in necessary environment variables

### Development Mode

```bash
pnpm -F server run dev
```

- Starts the development server

### Build for Production

```bash
pnpm -F server run build
```

- Compiles and minifies for production
- When build is done, the run `pnpm -F server run start` to start the server

### More useful commands

```bash
pnpm -F server run lint       # check lint
pnpm -F server run lint:fix   # check and fix lint
pnpm -F server run test       # run test
```

## 🔧 Development Workflow

### 🚨 Important Git Practices

- Never push directly to `main` branch
- Always use `[YourName][Date]` format for branches
- Write clear, concise commit messages
- Pull the latest changes before starting work

## 🤝 Contributing Guidelines

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b [YourName][Date]
   # Example: git checkout -b Nina1231
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin [YourName][Date]
   # Example: git push origin Nina1231
   ```
5. Open a Pull Request

### Branch Naming Convention

- Format: `[YourName][Date]`
- Example: `Nina1231`
- Purpose: Unique identification of feature/work branches

#### Initial Setup

1. Sync the latest code

```bash
# Switch to main branch
git checkout main

# Pull the latest changes
git pull origin main
```

2. Create a new feature branch

```bash
# Create branch using [YourName][Date] format
git checkout -b [YourName][Date]

# Example
git checkout -b Nina1231
```

### Commit Process

1. Stage your changes

```bash
# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add some AmazingFeature"
```

2. Push your branch

```bash
# Push using the same branch name
git push -u origin [YourName][Date]

# Example
git push -u origin Nina1231
```

3. Create a Pull Request

- Open a Pull Request on GitHub
- Request code review
- Ensure all checks and tests pass

## 📝 Commit Message

See more details, refer to [Conventional Commits](https://www.conventionalcommits.org/en)

Add scope if possible (ex. `feat(operator): add new feature`).

| Type     | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| feat     | A new feature                                                                                          |
| fix      | A bug fix                                                                                              |
| docs     | Documentation only changes                                                                             |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| refactor | A code change that neither fixes a bug nor adds a feature                                              |
| perf     | A code change that improves performance                                                                |
| test     | Adding missing tests or correcting existing tests                                                      |
| build    | Changes that affect the build system or external dependencies (example scopes: Cargo, Docker)          |
| ci       | Changes to our CI configuration files and scripts (example scopes: Drone)                              |
| chore    | Other changes that don't modify src or test files                                                      |

## 📞 Contact

- Project Lead: Nina, Philly
- Repository: https://github.com/ting850911/hackthon2025
