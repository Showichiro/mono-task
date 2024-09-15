import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { useRef, type FC, type ReactNode } from "react";
import { useButton } from "react-aria";

export const AccessibleButton: FC<
  { children: ReactNode } & Parameters<typeof useButton>[0] &
    VariantProps<typeof buttonVariants>
> = ({ children, ...rest }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(rest, ref);
  return (
    <Button {...buttonProps} ref={ref}>
      {children}
    </Button>
  );
};
