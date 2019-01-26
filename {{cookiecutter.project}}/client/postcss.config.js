module.exports = [
  /**
   * postcss-bgimage
   * https://github.com/ahtohbi4/postcss-bgimage
   *
   * Removes background-image properties with url() values or leaves only its.
   * It allows to separate your layouts CSS from the images CSS to boost a speed
   * of showing a page.
   */

  /**
   * postcss-selector-not
   * https://github.com/postcss/postcss-selector-not
   *
   * Transform :not() W3C CSS leve 4 pseudo class to :not() CSS level 3
   * selectors.
   */
  require('postcss-selector-not'),

  /**
   * Ruksak ---------------------------------------------------
   * http://simplaio.github.io/rucksack/
   */

  /**
   * postcss-alias-atrules
   * https://github.com/maximkoretskiy/postcss-alias-atrules
   *
   * Creates aliases for at-rules.
   */
  require('postcss-alias-atrules'),

  /**
   * postcss-verthorz
   * https://github.com/davidhemphill/postcss-verthorz
   *
   * Add vertical and horizontal spacing shorthand.
   * ph: 30px;
   * mv: 100px;
   */
  // require('postcss-verthorz'), // Bugs!

  /**
   * postcss-transform-shortcut
   * https://github.com/jonathantneal/postcss-transform-shortcut
   */
  // require('postcss-transform-shortcut'), // Error

  /**
   * postcss-alias
   * https://github.com/seaneking/postcss-alias
   */
  require('postcss-alias'),

  /**
   * postcss-position
   * https://github.com/seaneking/postcss-position
   */
  require('postcss-position'),

  /**
   * postcss-quantity-queries
   * https://github.com/pascalduez/postcss-quantity-queries
   */
  require('postcss-quantity-queries'),

  /**
   * postcss-input-style
   * https://github.com/seaneking/postcss-input-style
   */
  require('postcss-input-style'),

  /**
   * postcss-clearfix
   * https://github.com/seaneking/postcss-clearfix
   */
  require('postcss-clearfix'),

  /**
   * postcss-fontpath
   * https://github.com/seaneking/postcss-fontpath
   */
  require('postcss-fontpath'),

  /**
   * laggard
   * https://github.com/seaneking/laggard
   */
  require('laggard'),

  /**
   * Ruksak --------------------------------------------------- end
   */

  /**
   * postcss-compact-mq
   * https://github.com/rominmx/postcss-compact-mq
   */
  require('postcss-compact-mq')({}),

  /**
   * postcss-filter-mq
   * https://github.com/simeydotme/postcss-filter-mq
   */
  // require('postcss-filter-mq')(), // Errors

  /**
   * css-mqpacker
   * https://github.com/hail2u/node-css-mqpacker
   */
  require('css-mqpacker')({
    sort: true,
  }),

  /**
   * postcss-short-spacing
   * https://github.com/jonathantneal/postcss-short-spacing
   */
  require('postcss-short-spacing')({}),

  /**
   * postcss-define-units
   * https://github.com/preusx/postcss-define-units
   */
  require('postcss-define-units').default,

  /**
   * postcss-vertical-rhythm
   * https://github.com/markgoodyear/postcss-vertical-rhythm
   */
  // require('postcss-vertical-rhythm'),

  /**
   * postcss-calc
   * https://github.com/postcss/postcss-calc
   */
  require('postcss-calc'),

  /**
   * postcss-round-subpixels
   * https://github.com/himynameisdave/postcss-round-subpixels
   */
  require('postcss-round-subpixels'),


  require('autoprefixer')({
    browsers: [
      '> 0.1%',
      'last 2 versions'
    ]
  }),

  /**
   * postcss-csso
   * Plugin: https://github.com/lahmatiy/postcss-csso
   * CSSO:   https://github.com/css/csso
   */
  require('postcss-csso')({ /* CSSO Options */ }),
]
