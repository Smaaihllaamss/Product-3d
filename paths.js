export const paths = {
  base: 'app/',
  html: {
    src: 'app/index.html',
    dest: 'dist/',
  },
  fonts: {
    src: 'app/fonts/*.{woff,woff2}',
    dest: 'dist/fonts/',
  },
  styles: {
    src: 'app/scss/**/*.scss',
    main: 'app/scss/main.scss',
    dest: 'app/css/',
  },
  scripts: {
    src: ['app/js/**/*.js', '!app/js/main.min.js', '!swiper-bundle.min.js'],
    main: 'app/js/main.js',
    dest: 'app/js/',
  },
  images: {
    src: 'app/images/**/*.{jpg,jpeg,png}',
    webp: 'app/images/**/*.{jpg,jpeg,png}',
    svg: 'app/images/*.svg',
    dest: 'dist/images/',
  },
  icons: {
    src: 'app/icons/*.svg',
    dest: 'app/images/',
  },
  swiper: {
    css: 'app/css/swiper-bundle.min.css',
    js: 'app/js/swiper-bundle.min.js',
    dest: 'dist/',
  },
  resources: {
    src: 'app/resources/**/*',
    manifest: 'app/resources/manifest.json',
    favicon: 'app/resources/favicon.ico',
    robots: 'app/resources/robots.txt',
    dest: 'dist/resources/',
  },
  clean: {
    partial: 'dist/**/*',
  },
  build: {
    css: 'app/css/style.min.css',
    js: 'app/js/main.min.js',
    base: 'app/',
    dest: 'dist/',
  },
};
