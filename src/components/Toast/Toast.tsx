import type React from "react";
import { useState, Ref, forwardRef, HTMLAttributes, RefObject } from "react";
import type { MergeElementProps } from "../utils";
import type { ComponentBase, TextInputType } from "../types";
import { Field, FieldProps } from "../Field/Field";
import { useTextField } from "react-aria";
import type { AriaTextFieldProps } from "@react-types/textfield";

import { st, classes } from "./toast.st.css";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
}

const Toast = (props: ToastProps, ref?: Ref<HTMLDivElement>) => {
  return <div ref={ref}>{`Toast - type: ${props.type} `}</div>;
};

const _ToastWithForwardRef = forwardRef<HTMLDivElement, ToastProps>(Toast);
export { _ToastWithForwardRef as Toast };
