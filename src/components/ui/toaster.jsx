import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { CheckCircle2, AlertCircle, Info, XCircle, Bell } from "lucide-react";

const icons = {
  default: <Bell className="h-5 w-5 text-slate-500" />,
  destructive: <XCircle className="h-5 w-5 text-white" />,
  success: <CheckCircle2 className="h-5 w-5 text-white" />,
  warning: <AlertCircle className="h-5 w-5 text-white" />,
  info: <Info className="h-5 w-5 text-white" />,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant = "default", ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex gap-4 items-start">
              <div className="mt-0.5 flex-shrink-0">
                {icons[variant] || icons.default}
              </div>
              <div className="grid gap-1.5">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
