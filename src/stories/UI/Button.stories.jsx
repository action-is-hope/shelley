import React from "react";
// import { Button } from "../../indexLib";
import Icon from "../../components/Icon/Icon";
import Button, { ButtonProps } from "../../components/Button/Button";

export default {
  component: Button,
  title: "UI/Button",
  // Sets the layout parameter component wide.
  parameters: {
    // layout: "centered",
  },

  argTypes: {
    tone: {
      options: [1, 2, 3, 4],
      control: { type: "inline-radio" },
      description: "Tone of the button",
    },
    variant: {
      options: ["primary", "secondary", "quiet", "fab"],
      control: { type: "inline-radio" },
    },
    vol: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "inline-radio" },
    },
  },
};

const Template = (args) => <Button {...args}>Button text label</Button>;

export const Default = Template.bind({});

Default.args = {};

export const Primary = Template.bind({});

Primary.args = {
  tone: 1,
  variant: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  tone: 1,
  variant: "secondary",
};

export const Quiet = Template.bind({});

Quiet.args = {
  tone: 1,
  variant: "quiet",
};

export const Fab = Template.bind({});

Fab.args = {
  tone: 1,
  variant: "fab",
  icon: (
    <Icon>
      <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
    </Icon>
  ),
};

export const Disabled = Template.bind({});

Disabled.args = {
  tone: 1,
  variant: "primary",
  disabled: true,
};
