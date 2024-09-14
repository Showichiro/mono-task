import { Link as Base, type ToOptions } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";
import { Button, type buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";

export const Link: FC<
  { children: ReactNode } & VariantProps<typeof buttonVariants> & ToOptions
> = ({ children, variant = "link", size, ...rest }) => {
  return (
    <Button asChild variant={variant} size={size}>
      <Base {...rest}>{children}</Base>
    </Button>
  );
};
