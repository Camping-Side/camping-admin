import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AddForm } from "@cp/products/AddForm";
import { within } from "@storybook/testing-library";

export default {
  title: "Example/AddForm",
  component: AddForm,
  args: {
    handleSubmit: action("onSubmit"),
  },
} as ComponentMeta<typeof AddForm>;

const Template: ComponentStory<typeof AddForm> = (args) => (
  <AddForm {...args} />
);

export const Default = Template.bind({});

export const TestAddForm = Template.bind({});
TestAddForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // const button = canvas.getByRole("button");
  // const { button, getPopup } = setup(canvasElement);
  // await userEvent.click(button);
  // const popup = getPopup();
  // await waitFor(() => {
  //   expect(popup).toBeInTheDocument();
  //   if (popup) {
  //     expect(button.clientWidth).toEqual(popup.clientWidth);
  //     expect(button.getBoundingClientRect().bottom).toEqual(popup.getBoundingClientRect().top);
  //   } else {
  //     throw new Error('Popup is not fully rendered');
  //   }
  // });
  // await userEvent.click(button);
  // await waitFor(() => expect(popup).not.toBeInTheDocument());
};
