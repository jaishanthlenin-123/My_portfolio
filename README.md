
# Jaishanth Lenin — Portfolio

A dark, Apple-inspired portfolio website showcasing machine learning projects, ProtoSem innovation work, weekly progress updates, and skills — built with plain HTML, CSS, and JavaScript.

🔗 **Live Site:** [https://jaishanthlenin-123.github.io/My_portfolio/]

---

## ✨ Features

- **Apple-inspired dark UI** — glassmorphic nav, gradient hero, smooth scroll-reveal animations
- **Projects section** — Digital Fraud Detection System, Sepsis Early Detection System, Academic Management System, each with a detailed interactive modal (overview, problem, solution, features, tech stack, architecture workflow, results, challenges, future improvements)
- **ProtoSem section** — innovation projects (DuctBoT, Ductoid, Fire Resistant Rescue Drone) with detail modals
- **Weekly Updates timeline** — interactive vertical timeline with per-week detail modals, Previous/Next navigation, and scroll-driven progress line
- **Skills grid** — programming, web development, databases, version control, AI/ML, and IoT/embedded systems
- **Working contact form** — powered by [EmailJS](https://www.emailjs.com/), with client-side validation and success/error feedback
- **Icon-based contact links** — Email, LinkedIn, GitHub, and LeetCode as premium hover-interactive cards
- **Fully responsive** — desktop, tablet, and mobile, including full-screen modal behavior on small screens
- **Accessible modals** — focus trap, ESC to close, click-outside to close, ARIA labels

---

## 🛠 Tech Stack

- HTML5
- CSS3 (custom properties, no frameworks)
- Vanilla JavaScript (no build step, no dependencies)
- [EmailJS](https://www.emailjs.com/) for contact form email delivery

---

## 📁 Project Structure

```
.
├── index.html      # Page structure and content
├── styles.css      # All styling (theme, layout, animations, modals)
├── script.js       # Interactivity (modals, timeline rendering, form handling)
└── resume.pdf      # Downloadable/viewable résumé
```

---

## 🚀 Running Locally

No build tools or dependencies required.

1. Clone the repository:
   ```bash
   git clone https://github.com/jaishanthlenin-123/My_portfolio.git
   cd My_portfolio
   ```
2. Open `index.html` directly in your browser, **or** serve it locally:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

---

## 🌐 Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Save — GitHub will publish your site at:
   ```
   https://jaishanthlenin-123.github.io/My_portfolio/
   ```
5. Paste that URL into the **Live Site** link at the top of this README.

---

## ✉️ Contact Form Setup (EmailJS)

The contact form uses EmailJS to send messages without a backend. To make it work with your own account:

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Set up an **Email Service** and an **Email Template**.
3. In `script.js`, replace the placeholders:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
   ```
4. In your EmailJS template settings, set **To Email** to `{{user_email}}` (or your chosen field name).

---

## 📬 Connect With Me

- **Email:** jaishanthlenin@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/jaishanthlenin
- **GitHub:** https://github.com/jaishanthlenin-123
- **LeetCode:** https://leetcode.com/u/EAnkAIbLeD/

---

## 📄 License

This project is open for personal reference. Feel free to fork it for inspiration, but please don't republish it as your own portfolio content.
