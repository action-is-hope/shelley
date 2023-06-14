import DisclosureGroup from "../../DisclosureGroup/DisclosureGroup";
import Item from "../../Item/Item";

const items = [
  {
    id: `1-storybook-showHide`,
    title: "Getting to the test centre",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Before the day of your test, check the start time of your 
          IELTS test and make sure you know how to get to the test centre on time. 
          We recommend doing this a week in advance so you're fully prepared.</p>
          <p>Quote Sem fringilla ut morbi <a href="/">Sapien et ligula dem fringilla ut morbi zee pow wow.</a></p>
          <ul>
          <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
        </ul>`,
        }}
      />
    ),
  },
  {
    id: `2-storybook-showHide`,
    title: "Special arrangements",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <p>Before the day of your test, check the start time of your 
          IELTS test and make sure you know how to get to the test centre on time. 
          We recommend doing this a week in advance so you're fully prepared.</p>
        <ul>
          <li>Lorem <a href="https://google.com">Ipsum is simply dummy text of the printing and typesetting industry</a>.</li>
          <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
        </ul>
        <p>Before the day of your test, check the start time of your 
        IELTS test and make sure you know how to get to the test centre on time. 
        We recommend doing this a week in advance so you're fully prepared.</p>`,
        }}
      />
    ),
  },
  {
    id: `3-storybook-showHide`,
    title:
      "There are two versions of the test, but how do I know which is right for me?",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Before the day of your test, check the start time of your IELTS 
          test and make sure you know how to get to the test centre on time. We recommend doing 
          this a week in advance so you're fully prepared.</p>`,
        }}
      />
    ),
  },
  {
    id: `4-storybook-showHide`,
    title: "Your identity documents",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<ul>
        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
        <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
      </ul>
      <p>Before the day of your test, check the start time of your IELTS 
          test and make sure you know how to get to the test centre on time. We 
          recommend doing this a week in advance so you're fully prepared.</p>`,
        }}
      />
    ),
  },
];

export const BasicDisclosureGroup = () => {
  return <DisclosureGroup items={items} />;
};
