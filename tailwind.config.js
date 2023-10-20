const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': '#00ABE1',
        'secondary': '#666B85',
        'third': '#B0B9D7',
        'main': '#222222',
        'placeholder': '#B0B9D7'
      },
      backgroundColor: {
        'primary': "#00ABE1",
        'profile-background': "#DAF6FF"
      },
      borderColor: {
        'primary': 'rgba(176, 185, 215, 0.50)',
        'secondary': "#00ABE1"
      }
    },
  },
  plugins: [],
});