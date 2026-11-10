"use client";

export function ConfirmSubmitButton({
  action,
  confirm,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirm?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
