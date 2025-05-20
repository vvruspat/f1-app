"use client";

import React, { type ComponentProps } from "react";

type Props = ComponentProps<"button">;

export const Button = ({ children, ...restButtonProps }: Props) => {
	return <button {...restButtonProps}>{children}</button>;
};
