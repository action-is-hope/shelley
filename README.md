# Shelley UI

Frankenstein was no monster but a beautiful energy surging through a collection of recycled misfit components... A little bit like a component library... In honour of Mary Shelley because we need more women in tech.

## Styable??

We are very thankful for Stylable
Developed by Wix (who know a few things about maintaining a shed load of styles) this is something that we found on a long hunt for something more resembling of the way we used to do CSS but with a few extras. We have used JSS, Emotion, Styled components and CSS Modules. We started with JSS, at first it was great but then we saw the CSS output of what we had built via dynamic styles. We than started to miss CSS stytax checking and irritaed by the lack of copy and paste ability. All this for what? CSS in JS?

But we thought we needed all this so we ploughed to using more of a half way house, Emotion... It seems ok but then we experianced issues with reviews... Nobody seemed to be able to agree an approach and there seemed to be multiple ways of doing the same thing and some of those may or may not have had performance issues that we would need to investigate. Then we considered the wider team, those who are still on the transation from traditional front end to modern front end. We empathised with then and this complexity wasn't going to be good for new team members either. Something wasn't right with this either and whilst we could have given it more time it just felt like we have overly complicated something that used to be fun, now we seem to spend more time getting the editors to work and having strange code in JS so that we could literally write CSS style syntax in JS... But then you need the styleable components plugin for vs code as it used the same suntax as Emotion....

Lets just stop for a second shall we.... What do we ACTUALLY want and why why why do we want it?

JS vars in JS - We already have them, just via an inline style so that we don't use them too much. Inline styles can be bad for those users implementing a user stylesheet but the types of thing we NEED to use them should be few and far between, maybe a dynamic transition... possiblY that's it! Last resort. But CSSinJS opened up a can of worms, never have we had so mcuh flexibiliy. Lets prop the crap out of everything, EVERYTHING must be configurable! Fast forward and you realise that you went too far, now you are basically writting CSS with React props. You can written a grid component that implements a CSS grid and you can confire it via props. Errr, great but I'd rather configure it via a CSS variable. Boom, there we have a requirement, we want variables, we know we want them but we also know they they too can get out of hand in component libraries... Have you ever build a Bootstrap theme? I'm sure you tottally used that encyclopedia of variables as the authors intended. What a mess! So we want variables but not too many of them. Why do we need variables?

Because we are going to support full site themeing. Ahh, another requirement, themeing. Great, and how are you planning to 'theme' these components with all your embedded CSSinJS. Ahh, I see you are basically making CSS properties configurable via the component and maybe a global stylesheet as well. That is disappointing. And in practice it is a nightmare, it's like using inline styles or worse <FONT> tags... How did we get here? CSS is an art and it you cannot see it and how it hangs together then you cannot paint. CSS was not meant to be a programming language and I don't really think it wants to be embedding inside one either.

At this point we were... finish this later... maybe blog it up at some point...

and you cannot get a holistic look at the CSS that is in play as it is hidden away in the component and don't EVEN get me started on supporting media queries OR any IE fallbacks we might need.

we certainly seem to have have a pull request that sits there whilst the
https://stylable.io/docs/guides/stylable-component-best-practices
https://marketplace.visualstudio.com/items?itemName=wix.stylable-intelligence
