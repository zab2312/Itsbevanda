# Creative Director Portfolio

React portfolio website for Marcus Chen, Creative Director.

## Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
  - After installation, verify by running: `node --version` and `npm --version`

> **Troubleshooting for Windows PowerShell users:**
> 
> **If you see "npm is not recognized":**
> - **Quick Fix:** Copy and paste this into your PowerShell window:
>   ```powershell
>   $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
>   ```
> - **Easiest Solution:** Use Command Prompt (cmd.exe) instead of PowerShell - npm works there without any changes.
> - **Or use batch files:** Double-click `npm-install.bat` or `npm-dev.bat` in the project folder.
> 
> **If you see "execution policy" error:**
> - Run PowerShell as Administrator (right-click → Run as Administrator), then execute:
>   ```powershell
>   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
>   ```
>   Type `Y` when prompted, then restart PowerShell.

## Setup

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - Run the installer and restart your terminal/command prompt

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
   - You can find these in your Supabase project settings: https://supabase.com/dashboard/project/_/settings/api

4. **Start development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

