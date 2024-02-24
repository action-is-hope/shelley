import React, { useState } from "react";
import {
  Disclosure,
  DisclosureProps,
  DisclosureGroup,
  Text,
  H2,
  P,
  Icon,
  IconProps,
} from "../../indexLib";
import { classes as spacing } from "../../styles/default/spacing.st.css";

export const DisclosurePropsTable = (props: DisclosureProps) => {
  <Disclosure {...props} />;
};

export const SingleDisclosure: React.FC = () => {
  return (
    <Disclosure
      title="Single Disclosure"
      triggerProps={{ iconPos: "start", vol: 5 }}
    >
      <>
        <H2 vol={3}>Disclosure title</H2>
        <P vol={2}>Some content inside of the Disclosure.</P>
      </>
    </Disclosure>
  );
};

export const SingleDisclosureExpanded: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <Disclosure title="Single Disclosure (uncontrolled)" defaultExpanded>
        <P vol={2}>Uncontrolled Disclosure content.</P>
      </Disclosure>

      <Disclosure
        title="Single Disclosure (controlled)"
        isExpanded={isExpanded}
        onExpandedChange={() => setIsExpanded((v) => !v)}
      >
        <P vol={2}>Controlled Disclosure content.</P>
      </Disclosure>
    </>
  );
};

export const SingleDisclosureCustomIcon: React.FC = () => {
  const CustomIcon: React.VFC<IconProps> = () => (
    /* This is a Material UI icon so we set the viewBox accordingly. */
    <Icon viewBox="0 0 24 24">
      <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </Icon>
  );

  return (
    <Disclosure title="Single Disclosure" triggerIcon={CustomIcon}>
      <>
        <H2 vol={3}>Disclosure title</H2>
        <P vol={2}>Some content inside of the Disclosure.</P>
      </>
    </Disclosure>
  );
};

export const SingleDisclosureIconAlt: React.FC = () => {
  return (
    <Disclosure
      title="Single Disclosure"
      expandString="Show more"
      collapseString="Show less"
      iconAltVisible
    >
      <>
        <H2 vol={3}>Disclosure title</H2>
        <P vol={2}>Some content inside of the Disclosure.</P>
      </>
    </Disclosure>
  );
};

const items2 = [
  {
    id: "ex1-1",
    title: "Afforestation",
    content:
      "Planting of new forests on lands that historically have not contained forests. For a discussion of the term forest and related terms such as afforestation, reforestation and deforestation, see the IPCC Special Report on Land Use, Land-Use Change, and Forestry (IPCC, 2000), information provided by the United Nations Framework Convention on Climate Change (UNFCCC, 2013) and the report on Definitions and Methodological Options to Inventory Emissions from Direct Human-induced Degradation of Forests and Devegetation of Other Vegetation Types (IPCC, 2003).",
    related:
      "Reforestation, Deforestation, and Reducing Emissions from Deforestation and Forest Degradation (REDD+).",
  },
  {
    id: "ex1-2",
    title: "Air pollution",
    content:
      "Degradation of air quality with negative effects on human health or the natural or built environment due to the introduction, by natural processes or human activity, into the atmosphere of substances (gases, aerosols) which have a direct (primary pollutants) or indirect (secondary pollutants) harmful effect.",
    related: "Aerosol and Short-lived climate forcers (SLCF).",
  },
  {
    id: "ex1-3",
    title: "Albedo",
    content:
      "The fraction of solar radiation reflected by a surface or object, often expressed as a percentage. Snow-covered surfaces have a high albedo, the surface albedo of soils ranges from high to low, and vegetation-covered surfaces and the oceans have a low albedo. The Earth’s planetary albedo changes mainly through varying cloudiness and changes in snow, ice, leaf area and land cover.",
  },
  {
    id: "ex1-4",
    title: "Anthropogenic emissions",
    content:
      "Emissions of greenhouse gases (GHGs), precursors of GHGs and aerosols caused by human activities. These activities include the burning of fossil fuels, deforestation, land use and land-use changes (LULUC), livestock production, fertilisation, waste management and industrial processes.",
    related: "Anthropogenic and Anthropogenic removals.",
  },
];

export const DynamicDisclosureGroup: React.FC = () => (
  <DisclosureGroup items={items2} triggerProps={{ vol: 4 }}>
    {(item) => (
      <>
        <P vol={2}>{item.content}</P>
        {item?.related && (
          <P vol={2} className={spacing.mt1}>
            <strong>See also:</strong> {item.related}
          </P>
        )}
      </>
    )}
  </DisclosureGroup>
);

const items = [
  {
    id: "ex2-1",
    title: "Mangrove planting in Marotaola, Madagascar",
    children: (
      <Text elementType="div" vol={2}>
        <span
          dangerouslySetInnerHTML={{
            __html: `<p>Madagascar is an island country in the Indian Ocean, approximately 400 kilometres off the coast of East Africa. It is the world’s second largest island country, after Indonesia, and the island of Madagascar itself is the fourth largest island in the world. The country is considered a <em>biodiversity hotspot</em>, and over 90% of its wildlife is found nowhere else on Earth. <a href="https://ecologi.com/projects/mangrove-planting-in-madagascar">Ecologi - Mangrove planting in Marotaola, Madagascar.</a></p>`,
          }}
        />
      </Text>
    ),
  },
  {
    id: "ex2-2",
    title: "Planting trees and supporting water security in Kenyan forests",
    children: (
      <Text elementType="div" vol={2}>
        <span
          dangerouslySetInnerHTML={{
            __html: `<p>Kenya is renowned for its magnificent wildlife and iconic landscapes, teeming with biodiversity due to its wide array of ecosystems ranging from deserts and wetlands to mountain and forest regions. <em>However</em>, Kenya is losing species of plants and animals at an alarming rate as a result of ongoing environmental degradation, poor land-use practices, and unsustainable natural resource management. These issues are all exacerbated by extreme weather events due to climate change, which negatively impact the country’s nature-based tourism revenue and, ultimately, the livelihoods of its <strong>people</strong>. <a href="https://ecologi.com/projects/restoring-forests-in-kenya">Ecologi - Planting trees and supporting water security in Kenyan forests.</a></p>`,
          }}
        />
      </Text>
    ),
  },
  {
    id: "ex2-3",
    title: "Restoring degraded land in Senegal",
    children: (
      <Text elementType="div" vol={2}>
        <span
          dangerouslySetInnerHTML={{
            __html: `<p>The Sahel region, spanning 5,400km from the Atlantic Ocean in the West to the Red Sea in the East, is a climatic region in Africa located between the Sahara desert to the North and the Sudanian savanna to the South. Its tropical, semi-arid climate means that months often pass without rainfall. In recent years droughts have become common, with the most severe in recent times occurring between June and August 2010, when extremely high temperatures combined with a lack of rainfall to cause famine and illness across the Sahel. Such devastating weather patterns have been worsened by climate change – people in the Sahel are currently some of the most affected by climate change in the world, with their livelihoods becoming increasingly precarious. <a href="https://ecologi.com/projects/restoring-degraded-land-senegal">Ecologi - Restoring degraded land in Senegal</a></p></p>`,
          }}
        />
      </Text>
    ),
  },
  {
    id: "ex2-4",
    title: "Planting forest gardens in Tanzania",
    children: (
      <Text elementType="div" vol={2}>
        <span
          dangerouslySetInnerHTML={{
            __html: `<p>Tanzania is an East African country, situated just south of the Equator, which is home to around 60 million people. Its climate is varied due to the nature of its typography, with hot and humid low plains on the east, and generally cool highlands in the north and south. Tanzania is well recognised for its renowned tourism destinations including Mount Kilimanjaro, Africa’s highest mountain, and the Serengeti’s annual wildebeest migration. <a href="https://ecologi.com/projects/planting-forest-gardens-in-tanzania">Ecologi - Planting forest gardens in Tanzania</a></p>`,
          }}
        />
      </Text>
    ),
  },
];

export const DynamicDisclosureGroupChildren: React.FC = () => {
  return <DisclosureGroup title="Disclosure Group" items={items} />;
};

export const DisclosureGroupSingleView: React.FC = () => {
  return <DisclosureGroup title="Disclosure Group" items={items} singleView />;
};
