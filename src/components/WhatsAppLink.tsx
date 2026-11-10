export function WhatsAppLink({
  label = "וואטסאפ",
  text,
  className = "btn-ghost",
}: {
  label?: string;
  text?: string;
  className?: string;
}) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  if (!number) return null;
  const href = text ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : `https://wa.me/${number}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}
