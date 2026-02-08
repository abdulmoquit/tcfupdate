import { useEffect } from 'react';

/**
 * Custom hook for smooth scrolling to anchor links
 * Provides eased animation when clicking navigation links
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            // Get navbar height for offset
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar?.offsetHeight || 80;

            // Calculate target position
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            // Smooth scroll with easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without jumping
            window.history.pushState(null, '', href);
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
};
