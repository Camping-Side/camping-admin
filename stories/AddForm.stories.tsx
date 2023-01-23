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

export const TestPriceGrid = TestTemplate.bind({});
TestPriceGrid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const label = canvas.getAllByText("판매가")[1];
  const inputGrid = label.nextElementSibling as HTMLElement;

  if (!inputGrid) {
    return;
  }

  const inputGridCanvas = within(inputGrid);
  const input = inputGridCanvas.getByRole("spinbutton");
  const submitData = document.getElementById("submitData");
  const { submitButton, resetButton } = await getButtons(canvasElement);

  const inputAndSubmit = async (value: string) => {
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.keyboard(value);
    await userEvent.click(submitButton);
  };

  // 1000을 입력하고 저장하면 1000이 저장되어야 한다.
  inputAndSubmit("1000");

  await waitFor(() => {
    expect(submitData).toHaveTextContent(`"price":"1000"`);
  });

  // 취소 버튼을 누르면 0으로 초기화되어야 한다.
  await userEvent.click(resetButton);
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(input).toHaveValue(0);
    expect(submitData).toHaveTextContent(`"price":0`);
  });

  // 0보다 작은 값을 입력하면 값이 저장되지 않아야 한다.(submit 결과는 이전 값이 유지되어야 한다.)
  inputAndSubmit("-100");
  await waitFor(() => {
    expect(input).toHaveValue(-100);
    expect(submitData).toHaveTextContent(`"price":0`);
  });
};
