// Cypress component tests for DisclosureGroup:

import { DisclosureGroup } from "../../src/indexLib";

const items = [
  {
    id: `1-storybook-showHide`,
    title: "The principle of mentalism",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p><em>"The All is Mind; the Universe is Mental." —The Kybalion</em></p>
          <p>The principle of mentalism states that the universe is akin to a mental projection. 
          The is like manifestation 101, which is all about using your thoughts to shape your reality. 
          For anything to be, a thought must precede it. Through this principle, 
          it's believed that God is consciousness, or thought, and the universe is a manifestation of the mind of God. 
          Using this law, we, too, can harness the power of our minds to create the life we want.
        </p>`,
        }}
      />
    ),
  },
  {
    id: `2-storybook-showHide`,
    title: "The principle of correspondence",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <p><em>"As above, so below; as below, so above." —The Kybalion</em></p>
        <p>We've all heard this quote before, but maybe you never knew it was Hermes who first coined it. 
        It's closely related to the first principle of mentalism and states that what we hold in our thoughts 
        and mind will become our reality. It explains the many planes of existence, 
        including those of lower and higher vibrational frequencies and how they're connected.</p>`,
        }}
      />
    ),
  },
  {
    id: `3-storybook-showHide`,
    title: "The principle of vibration",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p><em>"Nothing rests; everything moves; everything vibrates." —The Kybalion</em></p>
          <p>Yes, believe it or not, the idea of "vibes" has been around a long, long time. 
          The principle of vibration states that all things, both physical matter and spiritual energy, 
          hold a certain vibration. Basic science tells us atoms are in constant motion, 
          as is the universe itself. Even our hearts, as they beat, give off different vibrations 
          depending on our emotional state. And when we're "vibing high," we're able to avoid low-level 
          frequencies that don't serve us.</p>`,
        }}
      />
    ),
  },
  {
    id: `4-storybook-showHide`,
    title: "The principle of polarity",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p><em>"Everything is dual; everything has poles; everything has its pair of opposites; 
          like and unlike are the same; opposites are identical in nature but different in degree; 
          extremes meet; all truths are but half-truths; all paradoxes may be reconciled." —The Kybalion</em></p>
          <p>The principle of polarity explains that seemingly opposite things are actually one and the same at 
          varying degrees. A simple example of this is hot and cold. Cold is just the absence of heat, 
          and they're both one thing: temperature. Physical matter and spiritual energy are the same thing, 
          with spiritual energy vibrating at a much higher level, such that it can't be perceived by our senses. 
          Love and hate are two ways of experiencing the same thing, a relationship toward something. 
          This is the foundation of alchemy, or the ability to "transmute" your experiences at will.</p>`,
        }}
      />
    ),
  },
];

const disclosureGroup = '[data-id="disclosure-group"]';
const accordion = '[data-id="disclosure-group--accordion"]';
const accordionItem = '[data-id="disclosure-group--accordionItem"]';
const disclosure = '[data-id="disclosure-group--disclosure"]';
const trigger = '[data-id="disclosure-group--trigger"]';
const hiddenContent = '[data-id="disclosure-group--hidden-content"]';
const content = '[data-id="disclosure-group--content"]';

const DynamicDisclosureGroup = function () {
  return (
    <div>
      <DisclosureGroup
        title="Disclosure Group"
        data-id="disclosure-group"
        items={items}
      />
    </div>
  );
};

describe("DisclosureGroup", () => {
  // Should render DisclosureGroup
  it("should render DisclosureGroup", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup).should("exist");
  });
});
