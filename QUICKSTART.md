# 🚀 Quick Start Guide - Deploy in 15 Minutes

This guide will get your portfolio live on Firebase as quickly as possible.

## Option 1: Deploy Without WordPress (Fastest - 5 minutes)

Perfect for getting started immediately with mock data.

### Step 1: Install Dependencies
```bash
cd achyut-portfolio
npm install
```

### Step 2: Update Your Information

Edit `lib/wordpress.ts` and update the mock data with your real information:

```typescript
export const getMockPersonalInfo = (): PersonalInfo => ({
  phone: '+1 (xxx) xxx-xxxx',  // Your phone
  email: 'your.email@example.com',  // Your email
  linkedin: 'https://linkedin.com/in/your-profile',  // Your LinkedIn
  github: 'https://github.com/your-username',  // Your GitHub
  instagram: 'https://instagram.com/your-profile',  // Your Instagram
  resume_url: '/resume.pdf',
  bio: 'Your bio here...',
  profile_image: '/profile.jpg',
});
```

### Step 3: Add Your Images

1. Place your profile photo as `public/profile.jpg`
2. Place your resume PDF as `public/resume.pdf`
3. Add any gallery images to `public/` folder

### Step 4: Build the Site
```bash
npm run export
```

This creates an `out` directory with your static website.

### Step 5: Deploy to Firebase

```bash
# Login to Firebase
firebase login

# Initialize (first time only)
firebase init hosting
# Select: Use existing project or create new
# Public directory: out
# Single-page app: Yes
# Don't overwrite index.html

# Deploy!
firebase deploy --only hosting
```

**Done!** Your site is now live at `https://your-project-id.web.app`

---

## Option 2: Full WordPress Integration (30 minutes)

For full content management capabilities.

### Part A: Set Up WordPress (15 minutes)

#### 1. Get WordPress Hosting

Choose one:
- **WordPress.com** (Business plan required for plugins)
- **Bluehost, SiteGround, or HostGator** (recommended)
- **Local WordPress** using XAMPP or Local by Flywheel (for testing)

#### 2. Install WordPress Plugin

1. Download `wordpress-plugin/portfolio-rest-api.php` from your project
2. In WordPress Admin: Plugins → Add New → Upload Plugin
3. Upload and activate the plugin
4. Go to Settings → Portfolio Info
5. Fill in all your personal information

#### 3. Add Content

**Add Projects:**
1. Go to Projects → Add New
2. Enter title and description
3. Fill in:
   - Project URL (optional)
   - GitHub URL
   - Technologies (e.g., "Firebase, Python, React")
4. Set featured image (optional)
5. Click Publish

**Add Blog Posts:**
1. Go to Posts → Add New
2. Write your blog post
3. Add featured image (optional)
4. Click Publish

### Part B: Connect to Your Site (10 minutes)

#### 1. Update Environment Variable

Create `.env.local` file:

```env
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

Replace `your-wordpress-site.com` with your actual WordPress URL.

#### 2. Update Code to Use Real Data

In these files, replace mock functions with real ones:

**pages/index.tsx:**
```typescript
// Change this:
const blogPosts = getMockBlogPosts();
const personalInfo = getMockPersonalInfo();

// To this:
const blogPosts = await getBlogPosts();
const personalInfo = await getPersonalInfo();
```

**pages/projects.tsx:**
```typescript
// Change this:
const projects = getMockProjects();

// To this:
const projects = await getProjects();
```

#### 3. Test Locally
```bash
npm run dev
```

Visit http://localhost:3000 and verify your WordPress content appears.

#### 4. Deploy
```bash
npm run deploy
```

**Done!** Your fully WordPress-powered site is live!

---

## 🎨 Quick Customizations

### Change Colors

Edit `styles/globals.css`:
```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-secondary: #YOUR_COLOR;
  /* ... etc */
}
```

### Change Your Name

1. Update in `components/Header.tsx` (logo)
2. Update page titles in each page file
3. Update in `components/Footer.tsx`

### Add More Projects (without WordPress)

Edit `lib/wordpress.ts` and add to `getMockProjects()`:

```typescript
{
  id: 3,
  title: { rendered: 'Your New Project' },
  content: { rendered: '<p>Description...</p>' },
  acf: {
    github_url: 'https://github.com/...',
    technologies: 'React, Node.js',
  },
}
```

---

## 🐛 Troubleshooting

### "Command not found: firebase"
```bash
npm install -g firebase-tools
```

### Build fails
```bash
rm -rf .next out node_modules
npm install
npm run export
```

### Can't connect to WordPress
1. Check your WordPress URL is correct in `.env.local`
2. Test the API manually: Visit `https://your-wp-site.com/wp-json/wp/v2/posts`
3. Make sure the plugin is activated

### Images not showing
- Make sure images are in the `public/` folder
- Reference them as `/image-name.jpg` (with leading slash)
- Rebuild after adding new images: `npm run export`

---

## 📝 Next Steps

1. **Custom Domain**: In Firebase Console → Hosting → Add custom domain
2. **Analytics**: Add Google Analytics ID in Firebase Console
3. **SEO**: Update meta descriptions in each page's `<Head>` component
4. **Blog Content**: Write and publish regular blog posts via WordPress
5. **Projects**: Add your completed projects as you build them

---

## 🎯 Pro Tips

- **Update Regularly**: Edit content in WordPress, then redeploy
- **Revalidation**: The site rebuilds every 60 seconds when someone visits (thanks to `revalidate: 60`)
- **Images**: Use WordPress Media Library for all images
- **Performance**: The static site loads incredibly fast
- **Mobile**: Test on mobile devices - it's fully responsive

---

## 📧 Need Help?

If you get stuck:
1. Check the full README.md
2. Google the specific error message
3. Check Firebase and Next.js documentation

---

**Congratulations! Your portfolio is now live! 🎉**

Share your URL and start showcasing your work!
