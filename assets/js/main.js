/**
 * Hypnotherapy Clinic - Main JS Components
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme and RTL Management
    const html = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Persistence Check
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentDir = localStorage.getItem('dir') || 'ltr';

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    const setDir = (dir) => {
        html.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    }

    const updateThemeIcon = (theme) => {
        if (!themeToggle) return;
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i data-lucide="sun"></i>' 
            : '<i data-lucide="moon"></i>';
        lucide.createIcons();
    }

    // Initial State
    setTheme(currentTheme);
    setDir(currentDir);

    // Event Heartbeats
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            setDir(newDir);
        });
    }

    // 1. Mobile Drawer Toggle Logic
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        const isClosed = menu.classList.contains('translate-x-full');

        if (isClosed) {
            menu.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => {
                if (menu.classList.contains('translate-x-full')) {
                    overlay.classList.add('hidden');
                }
            }, 300);
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // 2. Scroll Animation Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a stagger container, activate all children
                if (entry.target.classList.contains('reveal-up-stagger')) {
                    const children = entry.target.children;
                    for (let child of children) {
                        child.classList.add('active');
                        child.classList.add('reveal-up');
                    }
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-animate, .reveal-up, .reveal-in, .reveal-up-stagger').forEach(el => scrollObserver.observe(el));

    // 3. Form Validation (Placeholder)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Inducing Protocol...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Connection established. Our clinic will reach out to your subconscious node soon.');
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    });
    // 4. Dashboard Sidebar Toggle
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('dashboard-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (!sidebar) return;

        const isActive = sidebar.classList.contains('active');
        if (!isActive) {
            sidebar.classList.add('active');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            overlay.classList.remove('opacity-100');
            setTimeout(() => {
                if (!sidebar.classList.contains('active')) {
                    overlay.classList.add('hidden');
                }
            }, 300);
            document.body.style.overflow = '';
        }
    }
});
