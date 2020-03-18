import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";

// Global styles work with TS like this:
require("./example.css");

import DefaultLayout from "../layouts";
import Text, { H1, H2, H3, P } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import ShelleyBanner from "../components_site/ShelleyBanner/ShelleyBanner";
import Icon from "../components/Icon/Icon";
import { sign } from "crypto";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema.
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  return (
    <DefaultLayout>
      <ShelleyBanner />

      <Grid variant={1}>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Synopsis
          </H2>

          <img src="sskhshksk" />
          <img src="sskhshksk" alt="" />
          <h2>h2</h2>
          <h4>h4</h4>
          <label>Hi</label>
          <label htmlFor="hiihs">Hi</label>

          <Icon
            viewBox="4 -4 24 24"
            style={{
              width: "2em",
              margin: "2rem",
              fontSize: "60px",
              color: "aqua"
            }}
          >
            {/* eye */}
            <g transform="translate(0,0)">
              <path
                className="area"
                d="M0,19.990821477742085L0.7843137254901961,19.990821477742085L1.5686274509803921,19.981642955484165L2.3529411764705883,19.981642955484165L3.1372549019607843,19.95410738871042L3.9215686274509802,19.95410738871042L4.705882352941177,19.95410738871042L5.490196078431373,19.95410738871042L6.2745098039215685,19.95410738871042L7.058823529411765,19.9449288664525L7.8431372549019605,19.92657182193667L8.627450980392158,19.92657182193667L9.411764705882353,19.89903625516292L10.196078431372548,19.89903625516292L10.980392156862745,19.889857732905003L11.764705882352942,19.889857732905003L12.549019607843137,19.889857732905003L13.333333333333332,19.889857732905003L14.11764705882353,19.889857732905003L14.901960784313726,19.889857732905003L15.686274509803921,19.880679210647084L16.470588235294116,19.880679210647084L17.254901960784316,19.862322166131253L18.03921568627451,19.862322166131253L18.823529411764707,19.862322166131253L19.6078431372549,19.862322166131253L20.392156862745097,19.862322166131253L21.176470588235293,19.862322166131253L21.96078431372549,19.862322166131253L22.745098039215684,19.862322166131253L23.529411764705884,19.678751720972922L24.313725490196077,19.678751720972922L25.098039215686274,19.678751720972922L25.88235294117647,19.513538320330426L26.666666666666664,19.513538320330426L27.450980392156865,19.45846718678293L28.23529411764706,19.44928866452501L29.019607843137255,19.430931620009176L29.80392156862745,19.35750344194585L30.588235294117645,19.30243230839835L31.372549019607842,19.072969251950436L32.15686274509804,18.88022028453419L32.94117647058823,18.595686094538777L33.72549019607843,17.97154658100046L34.50980392156863,17.448370812299217L35.294117647058826,16.17255621844883L36.07843137254902,15.071133547498853L36.86274509803921,14.446994033960532L37.64705882352941,11.197797154658101L38.431372549019606,8.242312987608996L39.2156862745098,4.7361174850849L40,0L40,20L39.2156862745098,20L38.431372549019606,20L37.64705882352941,20L36.86274509803921,20L36.07843137254902,20L35.294117647058826,20L34.50980392156863,20L33.72549019607843,20L32.94117647058823,20L32.15686274509804,20L31.372549019607842,20L30.588235294117645,20L29.80392156862745,20L29.019607843137255,20L28.23529411764706,20L27.450980392156865,20L26.666666666666664,20L25.88235294117647,20L25.098039215686274,20L24.313725490196077,20L23.529411764705884,20L22.745098039215684,20L21.96078431372549,20L21.176470588235293,20L20.392156862745097,20L19.6078431372549,20L18.823529411764707,20L18.03921568627451,20L17.254901960784316,20L16.470588235294116,20L15.686274509803921,20L14.901960784313726,20L14.11764705882353,20L13.333333333333332,20L12.549019607843137,20L11.764705882352942,20L10.980392156862745,20L10.196078431372548,20L9.411764705882353,20L8.627450980392158,20L7.8431372549019605,20L7.058823529411765,20L6.2745098039215685,20L5.490196078431373,20L4.705882352941177,20L3.9215686274509802,20L3.1372549019607843,20L2.3529411764705883,20L1.5686274509803921,20L0.7843137254901961,20L0,20Z"
              ></path>
            </g>
          </Icon>

          <Icon>
            {/* eye */}
            <path d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z"></path>
          </Icon>
          <Icon>
            <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
          </Icon>
          <Icon>
            {/* angle-double-right */}
            <path d="M2 13h2l5-5-5-5h-2l5 5z"></path>
            <path d="M7 13h2l5-5-5-5h-2l5 5z"></path>
          </Icon>

          <Icon>
            {/* info-circle-o */}
            <path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
            <path d="M7 6h2v7h-2v-7z"></path>
            <path d="M7 3h2v2h-2v-2z"></path>
          </Icon>

          <Icon>
            {/* info-circle */}
            <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-7h2v7zM9 5h-2v-2h2v2z"></path>
          </Icon>

          <Icon>
            {/* info */}
            <path d="M6 5h4v11h-4v-11z"></path>
            <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          </Icon>

          <Icon>
            {/* input */}
            <path d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z"></path>
            <path d="M2 6h1v4h-1v-4z"></path>
          </Icon>
          <Icon>
            {/* ellipsis-dots-v */}
            <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M10 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          </Icon>

          <Icon>
            {/* check.svg */}
            <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
          </Icon>

          <Icon>
            <path d="M965.76 818.56c15.067-11.821 24.657-30.030 24.657-50.479 0-22.916-12.044-43.019-30.147-54.324l-0.27-372.637-64 42.88v329.6c-18.116 11.51-29.963 31.47-29.963 54.198 0 20.246 9.401 38.295 24.075 50.023l-24.192 32.099c-20.65 26.224-33.325 59.576-33.918 95.866l-0.002 78.214h51.84c0.103 0.001 0.225 0.001 0.347 0.001 26.334 0 48.446-18.073 54.61-42.492l21.203-85.509v128h64v-77.44c-0.595-36.424-13.27-69.776-34.18-96.343z"></path>
            <path d="M512 0l-512 256 512 320 512-320-512-256z"></path>
            <path d="M512 640l-320-213.12v109.44c0 58.24 188.16 231.68 320 231.68s320-173.44 320-231.68v-109.44z"></path>
          </Icon>

          <Icon>
            {/* laptop */}
            <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
          </Icon>

          <Icon>
            {/* tablet.svg */}
            <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
          </Icon>

          <Icon>
            {/* mobile */}
            <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
          </Icon>

          {/* Try this with new version... */}
          {/* <p className={classnames(text.vol3, text.intro)}>Hello</p> */}
          <P vol={4}>
            Follow the story of a digital nomad and an online entity called
            Shelley as they strive night and day to create something beautiful
            from the carelessly discarded <code>body</code> parts that they have
            found lurking around the internet. Throw the switch!
          </P>

          <H2 uppercase vol={2}>
            Introduction
          </H2>

          <P>
            Shelley would not be possible without Stylable, a style managing
            solution built by a great team over at Wix who describe it as:{" "}
            <q>CSS for components</q>.
          </P>

          <P>
            Stylable reunites us with our inner Zen Garden &apos;skillz&apos;
            with a wonderful feeling of nostalgia with its simple and standards
            aware approach to managing styles.
          </P>
          <P>What is Stylable and why did we choose it?</P>

          <H2 uppercase vol={2}>
            Contents
          </H2>

          <ul className={style.menuList}>
            <Text tag="li">
              <Link to="/button/">Button</Link>
            </Text>
            <Text tag="li">
              <Link to="/text/">Text</Link>
            </Text>
            <Text tag="li">
              <Link to="/blockquote/">Blockquote</Link>
            </Text>
            <Text tag="li">
              <Link to="/labels/">Labels</Link>
            </Text>
            <Text tag="li">
              <Link to="/inputText/">Input Text</Link>
            </Text>
            <Text tag="li">
              <Link to="/inputSelection/">Input Selection</Link>
            </Text>
            <Text tag="li">
              <Link to="/visually-hidden/">VisuallyHidden</Link>
            </Text>
          </ul>

          <H2 uppercase vol={2}>
            Theming
          </H2>

          <P>
            Sylyable is build based on the CSS standards where some might see
            limitations we see as forgoing tools that will get us into trouble.
            Conveniance will always screw us, look at the state of the planet.
          </P>

          <P>
            You own the styles... We thin at the moment we will offer you our
            main theme but not by way of something that we intend to
            &apos;support&apos;. What do we mean by this?
          </P>
          <P>
            Shelley provides you with <em>unstyled</em> components, this is the
            core of Shelley. We think it makes Shelley stand out a bit and we
            find it very powerful. It&apos;s power comes from it&apos;s ability
            to promote and facilitae simplicity, transparancy, agility and
            flexibility.
          </P>
          <P>
            Simplicity: In that our components don&apos;t have to work so hard
            providing ever layout or colour option under the sun. We can focus
            instead on making sure the HTML output is solid whilst
            overengineering our CSS. Lovely.
          </P>
          <P>
            Transparancy: In that our components do not hide anything from you,
            you literally own the CSS, copy, paste, interate. We want you to
            take ownership of it, we need CSS experts again and we need
            libraries that facilitate the art.
          </P>
          <P>
            Agility: In that we have enough tools for us to hit a sweet spot of
            complexity and simplicity enabling us to throw things together
            quickly with easy maintence and can aid other inquisitive souls in a
            spot of rapid prototyping with a real look and feel.
          </P>

          <P>
            Flexibility: In that we have enough tools for us to hit a sweet spot
            of complexity and simplicity enabling us to throw things together
            quickly with easy maintence and can aid other inquisitive souls in a
            spot of rapid prototyping with a real look and feel.
          </P>

          <P>
            Focus: Yes that&apos;s right another F, but in actual fact we do
            like focus in general. When it comes to accessibility we like to
            embrace focus styles as part of the user experiance for everyone and
            in life we need focus now more than ever if we truly wish to stop
            enslaving the very planet that sustains us, <em>our</em> planet.
          </P>

          <P>
            Oh, look that was an accident, we spelled out <em>staff</em>... a
            very powerful weapon... There you have it, Shelley is actually an
            ancient metaphorical staff weapon... from Stargate... it&apos;s the
            best, and you use it in the fight of all fights - life.
          </P>
          <P>
            We have also tried to steer clear of any given nomenclature so that
            your code can remain free of internal naming politics. We use number
            indexes which you can map to your current internal nomencalture, we
            hate naming things.
          </P>
          <P>
            <q>This is the way.</q> <cite>- The Mandalorian</cite>
          </P>
          <P>
            You can copy over our main theme and use it as a base but then idea
            is that you own the CSS.
          </P>
          <P>
            We searched high and low for something that would enable us to build
            a UI library like this whilst keeping the essence of simple web
            design alive by going back to basics as much as possible. The
            answer?
          </P>
          <P>Stylable</P>
          <P>
            If you don&apos;t want to own the CSS then maybe this isn&apos;t for
            you.
          </P>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            About
          </H2>
          <P>
            We found Shelley, a slightly bitter and exacting digital entity,
            moping around the internet looking rather rejected and misunderstood
            but poised with imagination and spirit.
          </P>

          <P>
            Shelley exists for a number of reasons but one of them that has
            &apos;fallen out&apos; is the need to help people with vital
            knowledge communicate it effectively. We wanted to open our work up
            so as to enable others.
          </P>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Treeware 🌲
          </H2>
          <P>
            Planting some trees will solve the ecological disaster that is
            currently unfolding, but it is a conversation starter.
          </P>
          <P>
            What if talking about it everyday is the catalyst required to fix
            it? Have a little think about it; we&apos;ve got time.
          </P>
          <P>
            If you use Shelley then please honour our Treeware license and buy
            some trees. If use this site as a resource or you just like our
            style, perhaps you would consider it too?
          </P>
          <P>
            Have a <em>real</em> conversation about the climate <em>today</em>{" "}
            and <em>everyday</em> until it&apos;s damn well fixed!
          </P>

          <P>
            We have a slightly niche target audiance in that you lot are usually
            fairly science based in you thinking. So you must know deep down in
            your heart of hearts how bad this is but perhaps even unaware that
            you know. Talk about it! It&apos;s not going away, it is sobering;
            but hope lies in action and talking about it is something everyone
            can do. You are not a nut job for
          </P>
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
