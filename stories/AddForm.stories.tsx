import React, { FC } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { expect } from "@storybook/jest";

import { AddForm } from "@cp/products/AddForm";
import {
  queryByAttribute,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";

export default {
  title: "Example/AddForm",
  component: AddForm,
} as ComponentMeta<typeof AddForm>;

const Template: ComponentStory<typeof AddForm> = (args) => (
  <AddForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleSubmit: action("onSubmit"),
};

const TestTemplate: ComponentStory<FC> = () => {
  const handleSubmit = async (data: any) => {
    const submitData = document.getElementById("submitData");
    if (submitData) {
      submitData.innerText = JSON.stringify(data);
    }
  };

  return (
    <div>
      <AddForm handleSubmit={handleSubmit} />
      <div id="submitData" />
    </div>
  );
};

const getButtons = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);

  const submitButton = canvas.getByText("저장");
  const resetButton = canvas.getByText("취소");

  return {
    submitButton,
    resetButton,
  };
};

export const TestNameGrid = TestTemplate.bind({});
TestNameGrid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const label = canvas.getByText("상품명");
  const inputGrid = label.nextElementSibling as HTMLElement;

  if (!inputGrid) {
    return;
  }

  const inputGridCanvas = within(inputGrid);
  const input = inputGridCanvas.getByRole("textbox");
  const submitData = document.getElementById("submitData");
  const { submitButton, resetButton } = await getButtons(canvasElement);

  // 상품명을 입력하고 저장하면 입력한 값이 저장되어야 한다.
  await userEvent.click(input);
  await userEvent.keyboard("product name");
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(submitData).toHaveTextContent(`"productName":"product name"`);
  });

  // 취소 버튼을 누르면 초기화되어야 한다.
  await userEvent.click(resetButton);
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(input).toHaveTextContent("");
    expect(submitData).toHaveTextContent(`"productName":""`);
  });
};
