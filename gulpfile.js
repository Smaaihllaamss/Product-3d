import { paths } from './paths.js';
import { src, dest, watch, series, parallel } from 'gulp';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import browserSyncLib from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import newer from 'gulp-newer';
import rename from 'gulp-rename';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';
import size from 'gulp-size';
import debug from 'gulp-debug';
import { createRequire } from 'module';
import { deleteAsync } from 'del';

const scss = gulpSass(dartSass);

const require = createRequire(import.meta.url);
const uglify = require('gulp-uglify-es').default;

const bs = browserSyncLib.create();

function html() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(paths.html.dest));
}

function styles() {
  return src(paths.styles.main)
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 10 versions'],
          cascade: false,
        }),
      ])
    )
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('style.min.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(bs.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(bs.stream());
}

function copyFonts() {
  return src(paths.fonts.src)
    .pipe(debug({ title: 'Шрифт:' }))
    .pipe(dest(paths.fonts.dest));
}

//Manual image processing
function images() {
  return src([paths.images.src, paths.images.svg], { encoding: false })
    .pipe(newer(paths.images.dest))
    .pipe(dest(paths.images.dest));
}

//Automatic image processing
function webpImages() {
  return src(paths.images.webp, { encoding: false })
    .pipe(newer(paths.images.dest))
    .pipe(webp({ quality: 90 }))
    .pipe(rename({ extname: '.webp' }))
    .pipe(size({ title: 'WebP images' }))
    .pipe(dest(paths.images.dest));
}

function sprite() {
  return src(paths.icons.src)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: 'icons.svg',
            dest: '.',
          },
        },
        shape: {
          id: {
            separator: '-',
            generator: 'icon-%s',
          },
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: { attrs: 'fill|stroke|style' },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(size({ title: 'SVG-sprite' }))
    .pipe(dest(paths.icons.dest));
}

function copyResources() {
  return src(paths.resources.src)
    .pipe(newer(paths.resources.dest))
    .pipe(dest(paths.resources.dest));
}

function copySwiper() {
  return src([paths.swiper.css, paths.swiper.js], { base: paths.base })
    .pipe(newer(paths.swiper.dest))
    .pipe(dest(paths.swiper.dest));
}

function watching() {
  bs.init({
    server: {
      baseDir: paths.base,
    },
  });
  watch([paths.html.src], html);
  watch([paths.fonts.src], copyFonts);
  watch([paths.styles.main], styles);
  watch([paths.scripts.main], scripts);
  watch([paths.images.src], images);
  watch([paths.images.webp], webpImages);
  watch([paths.icons.src], sprite);
  watch([paths.resources.src], copyResources);
  watch([paths.swiper.css, paths.swiper.js], copySwiper);
  watch([paths.html.src]).on('change', bs.reload);
}

function cleanDist() {
  return deleteAsync([paths.clean.partial]);
}

function building() {
  return src([paths.build.css, paths.build.js], {
    base: paths.build.base,
  }).pipe(dest(paths.build.dest));
}

export {
  html,
  styles,
  scripts,
  copyFonts,
  images,
  webpImages,
  sprite,
  copyResources,
  copySwiper,
  watching,
};

const processImages = parallel(webpImages, sprite);
const staticAssets = parallel(copyFonts, images, copyResources, copySwiper);

const prepare = parallel(html, styles, scripts, processImages, staticAssets);

export const dev = series(prepare, watching);
export const build = series(cleanDist, prepare, building);
export default dev;

//gulp = gulp dev
//gulp or gulp dev - for development
//gulp build - for production
