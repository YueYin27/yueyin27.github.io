# Academic Website Template

A clean, modern, and responsive academic website template designed for researchers, professors, and academics. This template features a professional design with smooth animations, mobile responsiveness, and easy customization.

## Features

- **Modern Design**: Clean and professional layout with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices (desktop, tablet, mobile)
- **Interactive Elements**: Smooth scrolling, publication filtering, and hover effects
- **Accessibility**: Semantic HTML structure and keyboard navigation support
- **Performance**: Optimized CSS and JavaScript for fast loading
- **Print-Friendly**: Special styles for printing
- **SEO Ready**: Proper meta tags and semantic structure

## Sections Included

1. **Hero Section**: Introduction with name, title, and call-to-action buttons
2. **About**: Personal information, education, and statistics
3. **Research**: Research areas with icons and descriptions
4. **Publications**: Filterable publication list (Journal Articles, Conference Papers, Books)
5. **Teaching**: Course listings with descriptions and details
6. **Contact**: Contact information and social media links

## Quick Start

1. **Download or Clone** the repository
2. **Customize** the content in `index.html`
3. **Modify** colors and styling in `styles.css` (optional)
4. **Deploy** to your web server or hosting platform

## Customization Guide

### Basic Information

Edit the following in `index.html`:

```html
<!-- Replace "Your Name" with your actual name -->
<title>Your Name - Academic Website</title>
<h1>Your Name</h1>

<!-- Update your title and department -->
<h2>Academic Title</h2>
<p>Department of [Your Department]<br>
University Name</p>
```

### Personal Information

Update the About section with your information:

```html
<p>I am a [Your Field] researcher/educator with expertise in [specific areas]. 
My work focuses on [brief description of your research interests and goals].</p>

<!-- Update education details -->
<li><strong>Ph.D.</strong> in [Field], [University], [Year]</li>
<li><strong>M.S.</strong> in [Field], [University], [Year]</li>
<li><strong>B.S.</strong> in [Field], [University], [Year]</li>
```

### Research Areas

Customize your research areas in the Research section:

```html
<div class="research-area">
    <div class="research-icon">
        <i class="fas fa-microscope"></i>
    </div>
    <h3>Research Area 1</h3>
    <p>Description of your first research area and its significance in your field.</p>
</div>
```

### Publications

Add your publications to the Publications section:

```html
<div class="publication" data-category="journal">
    <div class="publication-year">2023</div>
    <div class="publication-content">
        <h3>Title of Your Journal Article</h3>
        <p class="authors">Your Name, Co-author Name</p>
        <p class="journal">Journal Name, Volume(Issue), Pages</p>
        <div class="publication-links">
            <a href="#" class="link-btn">DOI</a>
            <a href="#" class="link-btn">PDF</a>
        </div>
    </div>
</div>
```

### Teaching

Update your courses in the Teaching section:

```html
<div class="course">
    <h3>Course Code: Course Title</h3>
    <p class="course-description">Brief description of the course content, objectives, and what students will learn.</p>
    <div class="course-details">
        <span class="course-term">Fall 2023</span>
        <span class="course-level">Undergraduate</span>
    </div>
</div>
```

### Contact Information

Update your contact details:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h3>Email</h3>
        <p>your.email@university.edu</p>
    </div>
</div>
```

### Social Media Links

Update your social media profiles:

```html
<div class="social-links">
    <a href="https://linkedin.com/in/yourprofile" class="social-link"><i class="fab fa-linkedin"></i></a>
    <a href="https://twitter.com/yourhandle" class="social-link"><i class="fab fa-twitter"></i></a>
    <a href="https://github.com/yourusername" class="social-link"><i class="fab fa-github"></i></a>
    <a href="https://scholar.google.com/citations?user=yourid" class="social-link"><i class="fab fa-google-scholar"></i></a>
</div>
```

## Styling Customization

### Colors

The main color scheme can be modified in `styles.css`:

```css
/* Primary color */
--primary-color: #3498db;

/* Secondary color */
--secondary-color: #2c3e50;

/* Gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Fonts

The template uses Inter font from Google Fonts. You can change it by updating the font import and font-family properties.

### Layout

The layout uses CSS Grid and Flexbox for responsive design. You can modify the grid layouts in the respective section styles.

## Adding Your Photo

1. Replace the placeholder icon in the hero section:
```html
<div class="hero-image">
    <img src="path/to/your/photo.jpg" alt="Your Name" class="profile-photo">
</div>
```

2. Add CSS for the photo:
```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.3);
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Minimize HTTP Requests**: Combine CSS and JS files if needed
3. **Use CDN**: The template already uses CDN for Font Awesome and Google Fonts
4. **Enable Caching**: Configure your web server for proper caching

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Deploy automatically on push
3. Custom domain support available

### Traditional Web Hosting

1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Test all functionality

## File Structure

```
academic-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Optional: for images and other assets
    ├── images/
    └── documents/
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This template is free to use for personal and commercial projects.

## Support

If you need help customizing the template, please check the comments in the code or create an issue in the repository.

---

**Note**: Remember to replace all placeholder text with your actual information before deploying your website.