export var DEBUG = global.DEBUG = false;
export var WATCHING = global.WATCHING = false;

export var DIR = global.DIR = __dirname;

export var R = global.R = {
  src: './src/',
  dest: '../server/markup/',
};

export var P = global.P = {
  src: {
    root:   `${R.src}`,
    php:    `${R.src}php/`,
    py:     `${R.src}py/`,
    js:     `${R.src}js/`,

    html:   `${R.src}html/`,
    stylus: `${R.src}stylus/`,
    pug:    `${R.src}pug/`,
    css:    `${R.src}css/`,

    public: `${R.src}public/`,
    fonts: `${R.src}public/fonts/`,
  },

  dest: {
    root:   `${R.dest}`,
    php:    `${R.dest}php/`,
    py:     `${R.dest}py/`,
    js:     `${R.dest}static/js/`,

    html:   `${R.dest}templates/`,
    stylus: `${R.dest}static/css/`,
    pug:    `${R.dest}templates/`,
    css:    `${R.dest}static/css/`,

    public: `${R.dest}static/`,
    fonts: `${R.src}public/fonts/`,
  },
};
