import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef((props, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className="fixed top-0 right-0 z-50 flex flex-col p-4 max-w-md"
    {...props}
  />
));

const toastVariants = cva(
  "relative flex w-full items-center justify-between rounded-md border p-4 shadow"
);

const Toast = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants(), className)}
    {...props}
  />
));

const ToastTitle = React.forwardRef((props, ref) => (
  <ToastPrimitives.Title ref={ref} className="font-semibold" {...props} />
));

const ToastDescription = React.forwardRef((props, ref) => (
  <ToastPrimitives.Description ref={ref} className="text-sm" {...props} />
));

const ToastClose = React.forwardRef((props, ref) => (
  <ToastPrimitives.Close ref={ref} {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
