const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        cbrown: "#191515",
        cbrownl: "#231C1C",
        cbrownl2: "#2e2424",
        cbrownd: "#141010",
        cgray: "#e9e9e9",
        cgrayd: "#b8b8b8",
        clabel: "#b5a498",
        cnav: "#B2AFAA",
        cborder: "#606060",
        cborder2: "#4d4a47",
        cborderl: "#2a2a2a",
        cplaceholder: "#98938B",
        caccenture: "#FD6737",
        chr: "#444039",
        calertbg: "#991B1B",
        calertborder: "#F87171",
        calert: "#FEF2F2",
        calertbgsuccess: "#4D7C0F",
        calertbordersuccess: "#A3E635",
        calertsuccess: "#F7FEE7",
        calertbgwarning: "#B45309",
        calertborderwarning: "#FDE047",
        calertwarning: "#FFFBEB",
        calertlabel: "#FF8888",
        cfocusborder: "#A8AC98",
        corange: "#db5016",
        cMessageAlert: "#ff6f6f",
        cMessageWarning: "#ffed6f",
        cMessageSuccess: "#34d532",
        ccolnumber: "#998888",
        cboard1: "#8d735d38",
        cboard2: "#7c624c50",
        cswitchbg: "#423331",
        cswitchborder: "#99583d",
        cicon: "#d1a999",
        cwaiting: "#7bd570",
        cingame: "#da7607",
        cended: "#67abff",
        cerror: "#ff5555",
        newRoom: "#382d20",
        freeSeatText: "#34d532",
        hasMoveBoardBg: "#0e2a00",
      },
    },

    // colors: {
    //   gray: {
    //     DEFAULT: "#e9e9e9"
    //   }
    // }
    // backgroundColor: theme => ({
    //   ...theme('colors'),
    //   'primary': '#191515',
    //   'secondary': '#231C1C',
    //   'danger': '#e3342f',
    // }),
    // textColor: {
    //   'primary': '#e9e9e9',
    //   'secondary': '#FD6737',
    //   'danger': '#FF5162',
    // },
    // borderColor: theme => ({
    //   'primary': '#606060',
    //   'secondary': '#ffed4a',
    //   'danger': '#e3342f',
    // }),
    // placeholderColor: {
    //   'primary': '#A8A8A8',
    //   'secondary': '#ffed4a',
    //   'danger': '#FF5162',
    // }
  },
  variants: {
    extend: {},
  },
  plugins: []
}
