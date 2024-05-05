module.exports = {
    mode: "jit",
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        fontFamily: {
            regular: ['var(--font-regular)'],
        },
        extend: {
            outline: {
                blue: '2px solid #0000ff',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
