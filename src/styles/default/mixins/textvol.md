  /**
   * = Volumes / Text sizes
   *
   * Above we declared some text volume min and max, now we will explain as we
   * churn all of these values out as CSS3 vars (perhaps we are abusing them a little...).
   *
   * Are you ready for some serious over engineering? :-)
   *
   * Fluid type tutorial: https://www.smashingmagazine.com/2016/05/fluid-typography/
   *
   * Still with us? Now have a little gander at the variables we are setting for 
   * our text volumes below this comment block.
   *
   * You will notice each text size is comprised of three main font-size related values:
   *
   * - **min**: The minimum font size, this is the font size we want at our smallest 
   *   expected screen size, 320px, 16px for us. We use this number as an input to our crazy 
   *   modular fluid text CSS formula thingy that we found. It's cool. We 
   *   can also use this number to set a CSS lock (https://css-tricks.com/css-locks/)
   *   if we are concerned that the font might get to small... Watch maybe?
   * 
   * - **max**: The maximum font size, this is the font size we want at whatever screen size you
   *   like, I think we chose 1800px. So when the browser is 1800px wide then I want the
   *   text to be... 20px in our case. We also this number as an input to our crazy 
   *   stolen formula.
   *
   * - **scale**: This is the font size we use in between the range 320px - 1800px. This
   *   is the dynamic font-size that is always changing when the browser is winging 
   *   around the 320px-1800px zone. If we didn't have the CSS lock then it would just
   *   get bigger and bigger. This is the output of the crazyness. 
   * 
   *   The scale magically (read the article or just go with it) gives you back a value
   *   that looks like this: calc(1em + 0.25 * ((100vw - 20em) / (92.5)))
   *
   *   So the browser looks at that and goes, "Right! Got it! 16px at 320px wide, 20px 
   *   at 1800px wide and everything in between I will scale make smooth and fluid, 
   *   ahhhhhhh all is well with the world.... Zen..."
   *
   *   Just to confuse you more, all is set in em values, so that made no
   *   sense but we like to add to the mystery. Here is how that works out:
   *   20em = 320px
   *   92.5em = 1800px
   *   1em = 16px
   *   1.25em = 20px
   *
   *   But wait... there is more...
   *   
   *   calc(1em + 0.25 * ((100vw - 20em) / (92.5)))
   * 45px @ 2000 
   *   and once you have wrapped your head around all of that and understand it, you
   *   know CSS fundamentals quite well. Fun isn't it? I have no hair, #justSaying.
   *
   *
   *   Thanks and pops for the hard work and innovators:
   *   - https://www.smashingmagazine.com/2016/05/fluid-typography/
   *   - https://type-scale.com/ 
   *   - https://css-tricks.com/css-locks/
   * 
   *
   * = Overriding.
   *
   * If you want to override the font sizes to something different than ours... 
   * then you need to override them following CSS variables in your project file 
   * (import first and then override). So all that stuff you saw above for fonts,
   * you may want to copy that and the following block as well, tweak till you 
   * can't tweak no more.
   *
   * If you are overriding everything and feel restricted then maybe you should 
   * clone our entire default theme, essentially forking it and making it your
   * own.
   */
