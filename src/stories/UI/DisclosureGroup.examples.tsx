import React, { useState } from "react";
import {
  Button,
  Disclosure,
  DisclosureProps,
  DisclosureGroup,
  DisclosureGroupProps,
  Switch,
  Radio,
  RadioGroup,
  Text,
  H2,
  P,
  Icon,
  IconProps,
} from "../../indexLib";
import Warning from "../../icons/Warning";

function _DisclosureGroupPropsTable<T extends object>(
  props: DisclosureGroupProps<T>
) {
  return <DisclosureGroup {...props} />;
}
export const DisclosureGroupPropsTable = _DisclosureGroupPropsTable;

const items = [
  {
    title: "The principle of mentalism",
    children: (
      <Text
        as="div"
        vol={2}
        dangerouslySetInnerHTML={{
          __html: `<p><em>"The All is Mind; the Universe is Mental." —The Kybalion</em></p>
          <p>The principle of mentalism states that the universe is akin to a mental projection. 
          The is like manifestation 101, which is all about using your thoughts to shape your reality. 
          For anything to be, a thought must precede it. <a href="#">Through this principle, 
          it's believed that God is consciousness, or thought, and the universe is a manifestation of the mind of God. 
          Using this law, we, too, can harness the power of our minds to create the life we want.</a>
        </p>`,
        }}
      />
    ),
  },
  {
    title: "The principle of correspondence",
    children: (
      <Text
        as="div"
        vol={2}
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
    title: "The principle of vibration",
    children: (
      <Text
        as="div"
        vol={2}
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
    title: "The principle of polarity",
    children: (
      <Text
        as="div"
        vol={2}
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

export const DynamicDisclosureGroup = () => {
  return <DisclosureGroup title="Disclosure Group" items={items} singleView />;
};

export const SingleDisclosure = () => {
  return (
    <Disclosure
      title="Single Disclosure"
      triggerProps={{ iconPos: "end", vol: 5 }}
    >
      <>
        <H2 vol={3}>Disclosure title</H2>
        <P vol={2}>Some content inside of the Disclosure.</P>
      </>
    </Disclosure>
  );
};

export const SingleDisclosureCustomIcon = () => {
  const CustomIcon: React.VFC<IconProps> = () => (
    /* This is a Material UI icon so we set the viewBox accordingly. */
    <Icon viewBox="0 0 24 24">
      <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </Icon>
  );

  return (
    <Disclosure
      title="Single Disclosure"
      triggerIcon={CustomIcon}
      iconPos="end"
    >
      <>
        <H2 vol={3}>Disclosure title</H2>
        <P vol={2}>Some content inside of the Disclosure.</P>
      </>
    </Disclosure>
  );
};

export const SingleDisclosureOLD = () => {
  return (
    <Disclosure
      iconPos="end"
      iconText="Show more"
      id="itemId"
      // title="Single Disclosure"
      title={
        <>
          Single Disclosure <span>Show more</span>
        </>
      }
      data-id="disclosure"
    >
      <RadioGroup label="Are you a wizard?" defaultValue="yes">
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
      </RadioGroup>
    </Disclosure>
  );
};

const items2 = [
  {
    title: "Mark",
    contentItemOne: "Something",
    contentItemTwo: "Something else",
  },
  {
    title: "Paul",
    contentItemOne: "Something",
    contentItemTwo: "Something else",
  },
];

export const Example3: React.FC = () => (
  <DisclosureGroup items={items2}>
    {(item) => (
      <>
        <P>{item.contentItemOne}</P>
        <P>{item.contentItemTwo}</P>
      </>
    )}
  </DisclosureGroup>
);

export const SingleDisclosure2 = () => {
  return (
    <DisclosureGroup>
      <Disclosure
        iconPos="end"
        iconAltVisible
        iconText="Show more"
        title="Double Disclosure"
      >
        <RadioGroup label="Are you a wizard?" defaultValue="yes">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </Disclosure>
      <Disclosure iconPos="end" iconText="Show more" title="Double Disclosure">
        <RadioGroup label="Are you a wizard?" defaultValue="yes">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
      </Disclosure>
    </DisclosureGroup>
  );
};

export const DisclosureControlledExample = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{ padding: 10 }}>
      <Switch isSelected={isOpen} onChange={() => setIsOpen((v) => !v)}>
        Toggle open/close
      </Switch>
      <Disclosure
        iconPos="end"
        iconText="Show more"
        //optional id
        // id="itemId"
        title="Single Disclosure"
        isOpen={isOpen}
        onOpenChange={() => setIsOpen((v) => !v)}
        // defaultOpen
      >
        <>
          <H2 vol={3}>Disclosure title</H2>
          <P vol={2}>Some content inside of the Disclosure.</P>
        </>
      </Disclosure>
    </div>
  );
};
