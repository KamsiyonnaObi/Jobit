// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        Primary: "#0BAB7C",
        Secondary1: "#C7F4C2",
        Secondary2: "#D7D0FF",
        Secondary3: "FDDD8C",
        Secondary4: "FFBBD7",
        Natural1: "#F4F4F4",
        Natural2: "#F1F1F5",
        Natural3: "#FAFAFB",
        Natural4: "#F5F5F8",
        Natural5: "#E2E2EA",
        Natural6: "#92929D",
        Natural7: "#696974",
        Natural8: "#44444F",
        DarkBG1: "#13131A",
        DarkBG2: "#1C1C24",
        DarkBG3: "#21212B",
        White: "#FFFFFF",
        Black: "#171725",
      },
      boxShadow: {
        'custom': '0px 23px 30px 0px rgba(226, 226, 234, 0.40), -3px -2px 24px 0px rgba(0, 0, 0, 0.02)',
      },
    },
    fontFamily: {
      manrope: ["var(--font-manrope)"],
      sans: ["var(--font-dm-sans)"],
    },
  },
  plugins: [],
};
