// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors:{
        'main-100':'#393243',
        'main-200':'#231b2e',
        'main-300':'#170f23',
        'main-400':'#130c1c',
        'main-500':'#9b4de0',
        'main-600':'#5e4ce6',
        'text-100':'#fff',
        'text-200':'#807c87',
      },
     
      
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['dark', 'rounded']
  }
}