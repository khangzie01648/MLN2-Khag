/** @type {import('tailwindcss').Config} */
module.exports = {
    // Adam Smith Archive Config
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: '#d4af37',
            },
            fontFamily: {
                cinzel: ['var(--font-playfair)', 'serif'],
                montserrat: ['var(--font-montserrat)', 'sans-serif'],
                inter: ['var(--font-montserrat)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-montserrat)', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
