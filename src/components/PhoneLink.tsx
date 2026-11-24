import { PUBLIC_PHONE } from "@/lib/site";

/** Hidden while PUBLIC_PHONE.tel or PUBLIC_PHONE.display is empty. */
export function PhoneLink({
  className = "btn-ghost",
  label,
}: {
  className?: string;
  label?: string;
}) {
  if (!PUBLIC_PHONE.tel || !PUBLIC_PHONE.display) return null;
  return (
    <a href={`tel:${PUBLIC_PHONE.tel}`} className={className}>
      {label ?? PUBLIC_PHONE.display}
    </a>
  );
}
