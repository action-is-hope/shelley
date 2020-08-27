# Shelley UI

Frankenstein was no monster but a beautiful energy surging through a collection of recycled misfit components... A little bit like a component library... In honour of Mary Shelley because we need more women who want to be in tech, in tech. Shelley gave us a first glimpse into AI. Discuss. :-)

## Styable - https://stylable.io/

We are very thankful for Stylable. Developed by Wix (who know a few things about maintaining a shed load of styles). We have used JSS, Emotion, Styled components and CSS Modules. We started with JSS, at first it was great but then we saw the CSS output of what we had built via dynamic styles...

Then we began to miss other things like CSS syntax checking and copy and pasting regular CSS; like a game of whack-a-mole we trying to plug these with extensions and plug-ins. We felt far down a rabbit hole. All this for what? CSS in JS?

We reflected on what we actually needed. Variable support/management, namespaced selectors, good performance, simple syntax and great theming ability... That was about it, we already have inline dynamic styles when/if we REALLY need them via the style attribute.

We put everything down and went in hunt of something simplier. Something familar for the more traditional front end developers out there. Something for the CSS specialists that made the transition to JS but crave simplier times.

We found Stylable. We played around with it over Christmas and we loved it! It was like getting back an old toy that you thought was lost forever.

A quick conferance call with the peeps over at Wix and a few tweaks their end and we were ready to go. The best part was that we had come into this in the exact same way that Wix had done; we felt vindicated that the stylable team had had exactly the same experience with CSS in JS. Happily they figured out sooner and did something about it. It's not massively promoted and I hope that that changes. We shall see, but as CSS 

Stylable have a plug-in for VS Code, just search for 'stylable intelligence'. It has a few outstanding bugs but it is useful as it is.
https://marketplace.visualstudio.com/items?itemName=wix.stylable-intelligence

## Purpose of the project

To begin with this project it primaily driving sone of our internal projects. However we are planning to keep generic /configurable as possible for our own use as it will drive multiple sites. Stylable allows us to essenetially define our 'holy grain' HTML which is essentially exposed as a styling API for any CSS that we want to throw at it.

## Styling
Components come unstyled by default (a few exceptions) with all the styles coming from the theme, so you can completely do you own thing. This feature is one of the reasons for writing this, in honour of http://www.csszengarden.com/ before it is forgotton. CSS has always been versatile.

We are providing a base project/theme which we have just called `Default` whihch you are welcome to either extend off or copy and make your own.

If you are looking to extend it then take a look at the `Shelley` a project/theme which is the theme we use for shelley.earth

We have a Starter kit in the works - https://github.com/action-is-hope/starter-kits
