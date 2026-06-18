import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

/* ================= CONTEXT ================= */

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

/* ================= GROUP ================= */

const ToggleGroup = React.forwardRef((props, ref) => {
  const { className, variant, size, children, ...rest } = props;

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...rest}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = "ToggleGroup";

/* ================= ITEM ================= */

const ToggleGroupItem = React.forwardRef((props, ref) => {
  const { className, children, variant, size, ...rest } = props;
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

/* ================= EXPORTS ================= */

export { ToggleGroup, ToggleGroupItem };
