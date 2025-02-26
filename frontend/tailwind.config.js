/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4da6ff',
                    DEFAULT: '#0077e6',
                    dark: '#0056b3',
                },
                secondary: {
                    light: '#f8f9fa',
                    DEFAULT: '#e9ecef',
                    dark: '#dee2e6',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
        },
    },
    plugins: [],
}