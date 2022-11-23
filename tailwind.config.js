module.exports = {
    mode: "jit",
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        fontFamily: {
            fancy: ['Josefin Sans'],
            regular: ['Open Sans'],
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
