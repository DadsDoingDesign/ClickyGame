# Deployment Guide for ClickyGame

## Pushing to GitHub

### Prerequisites
1. Install Git from [git-scm.com](https://git-scm.com/downloads) if not already installed
2. Create a GitHub account if you don't have one

### Steps to Push to GitHub

1. Open a terminal or command prompt in your project directory
2. Initialize a Git repository:
   ```
   git init
   ```

3. Add all files to the repository:
   ```
   git add .
   ```

4. Commit the changes:
   ```
   git commit -m "Initial commit"
   ```

5. Add the remote repository:
   ```
   git remote add origin https://github.com/DadsDoingDesign/ClickyGame.git
   ```

6. Push the code to GitHub:
   ```
   git push -u origin main
   ```
   Note: If your default branch is named "master" instead of "main", use:
   ```
   git push -u origin master
   ```

## Deploying to Vercel

### Prerequisites
1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
2. Link your GitHub account to Vercel

### Steps to Deploy on Vercel

1. Log in to your Vercel account
2. Click on "Add New..." > "Project"
3. Select the GitHub repository "DadsDoingDesign/ClickyGame"
4. Configure the project settings (Vercel should automatically detect that it's a Next.js project)
5. Click "Deploy"

Vercel will automatically build and deploy your project. Once deployed, it will provide you with a URL where you can access your live application.

### Setting Up Automatic Deployments

By default, Vercel will automatically deploy your application whenever you push changes to the main branch of your GitHub repository. This means you can update your application by simply pushing new code to GitHub.

## Updating Your Application

To update your application after making changes:

1. Make your changes to the code
2. Commit the changes:
   ```
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```
   git push
   ```

Vercel will automatically detect the new commit and redeploy your application.
