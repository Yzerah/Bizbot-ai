import path from "path";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { addDays, formatDate, formatILS, formatNumber, stripBidi } from "@/lib/format";
import { lineTotalAgorot, type LineItem } from "@/lib/quote";

const fontDir = path.join(process.cwd(), "assets", "fonts");
Font.register({
  family: "Plex",
  fonts: [
    { src: path.join(fontDir, "IBMPlexSansHebrew-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontDir, "IBMPlexSansHebrew-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontDir, "IBMPlexSansHebrew-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontDir, "IBMPlexSansHebrew-Bold.ttf"), fontWeight: 700 },
  ],
});
// Hebrew words must not be hyphenated
Font.registerHyphenationCallback((word) => [word]);

const INK = "#0a0a0b";
const ROYAL = "#2443e6";
const MUTED = "#6b7280";
const LINE = "#e5e7eb";

const s = StyleSheet.create({
  page: { fontFamily: "Plex", fontSize: 10, color: INK, paddingTop: 0, paddingBottom: 60, paddingHorizontal: 0 },
  band: { height: 6, backgroundColor: ROYAL },
  body: { paddingHorizontal: 44, paddingTop: 34 },
  t: { direction: "rtl", textAlign: "right" },
  row: { flexDirection: "row-reverse" },
  header: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 22, borderBottomWidth: 1, borderBottomColor: LINE },
  docLabel: { fontSize: 9, fontWeight: 600, color: ROYAL, letterSpacing: 0.5 },
  docTitle: { fontSize: 24, fontWeight: 700, marginTop: 2 },
  meta: { fontSize: 9.5, color: MUTED, marginTop: 2 },
  sellerBox: { alignItems: "flex-start", maxWidth: 230 },
  logo: { maxHeight: 52, maxWidth: 150, objectFit: "contain", marginBottom: 8 },
  sellerName: { fontSize: 13, fontWeight: 700 },
  small: { fontSize: 9.5, color: MUTED, marginTop: 2 },
  section: { marginTop: 20 },
  sectionLabel: { fontSize: 8.5, color: MUTED, fontWeight: 500, marginBottom: 3 },
  clientName: { fontSize: 12, fontWeight: 600 },
  table: { marginTop: 22, borderWidth: 1, borderColor: LINE, borderRadius: 6 },
  th: { flexDirection: "row-reverse", backgroundColor: "#f5f6f8", paddingVertical: 7, paddingHorizontal: 10, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  tr: { flexDirection: "row-reverse", paddingVertical: 8, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: LINE },
  thText: { fontSize: 8.5, color: MUTED, fontWeight: 600 },
  cIdx: { width: 22 },
  cDesc: { flex: 1, paddingLeft: 8 },
  cQty: { width: 50 },
  cUnit: { width: 85 },
  cTotal: { width: 90 },
  totals: { marginTop: 16, alignSelf: "flex-start", width: 230 },
  totRow: { flexDirection: "row-reverse", justifyContent: "space-between", paddingVertical: 4 },
  grand: { flexDirection: "row-reverse", justifyContent: "space-between", backgroundColor: INK, color: "#fff", paddingVertical: 9, paddingHorizontal: 12, borderRadius: 6, marginTop: 6 },
  notes: { marginTop: 26, padding: 14, backgroundColor: "#f7f8fa", borderRadius: 6 },
  footer: { position: "absolute", bottom: 24, left: 44, right: 44, borderTopWidth: 1, borderTopColor: LINE, paddingTop: 8, flexDirection: "row-reverse", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: MUTED },
});

/** A right-aligned RTL text node. Strips bidi control chars that the PDF engine can't draw. */
function T({ children, style }: { children: React.ReactNode; style?: Style | Style[] }) {
  const content = typeof children === "string" ? stripBidi(children) : children;
  const extra = Array.isArray(style) ? style : style ? [style] : [];
  return <Text style={[s.t, ...extra]}>{content}</Text>;
}

/** Numbers/emails/phones: LTR run, aligned as requested. */
function N({ children, style, align = "right" }: { children: string; style?: Style; align?: "right" | "left" }) {
  return <Text style={[{ textAlign: align, direction: "ltr" }, style ?? {}]}>{stripBidi(children)}</Text>;
}

export type QuoteForPdf = {
  number: number;
  title: string | null;
  sellerName: string;
  sellerPhone: string | null;
  sellerEmail: string | null;
  sellerTaxId: string | null;
  sellerLogo: string | null;
  clientName: string;
  clientDetails: string | null;
  items: LineItem[];
  vatEnabled: boolean;
  validityDays: number;
  notes: string | null;
  subtotalAgorot: number;
  vatAgorot: number;
  totalAgorot: number;
  createdAt: Date;
};

export function QuoteDocument({ q }: { q: QuoteForPdf }) {
  return (
    <Document title={`הצעת מחיר ${q.number} - ${q.clientName}`} author={q.sellerName} creator="BizBot" producer="BizBot" language="he">
      <Page size="A4" style={s.page}>
        <View style={s.band} fixed />
        <View style={s.body}>
          <View style={s.header}>
            <View>
              <T style={s.docLabel}>הצעת מחיר</T>
              <View style={[s.row, { alignItems: "flex-end" }]}>
                <T style={s.docTitle}>מס׳ </T>
                <N style={s.docTitle}>{String(q.number)}</N>
              </View>
              <View style={[s.row, { marginTop: 6 }]}>
                <T style={s.meta}>תאריך: </T>
                <N style={s.meta}>{formatDate(q.createdAt)}</N>
              </View>
              <View style={s.row}>
                <T style={s.meta}>בתוקף עד: </T>
                <N style={s.meta}>{formatDate(addDays(q.createdAt, q.validityDays))}</N>
              </View>
            </View>
            <View style={s.sellerBox}>
              {q.sellerLogo ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={q.sellerLogo} style={s.logo} />
              ) : null}
              <T style={[s.sellerName, { textAlign: "left" }]}>{q.sellerName}</T>
              {q.sellerTaxId ? (
                <T style={[s.small, { textAlign: "left" }]}>{`ע.מ / ח.פ ${q.sellerTaxId}`}</T>
              ) : null}
              {q.sellerPhone ? <N style={s.small} align="left">{q.sellerPhone}</N> : null}
              {q.sellerEmail ? <N style={s.small} align="left">{q.sellerEmail}</N> : null}
            </View>
          </View>

          <View style={s.section}>
            <T style={s.sectionLabel}>לכבוד</T>
            <T style={s.clientName}>{q.clientName}</T>
            {q.clientDetails
              ? q.clientDetails.split("\n").map((l, i) => (
                  <T key={i} style={s.small}>{l}</T>
                ))
              : null}
          </View>

          {q.title ? (
            <View style={[s.row, { marginTop: 14 }]}>
              <T style={{ color: MUTED }}>הנדון: </T>
              <T style={{ fontWeight: 600 }}>{q.title}</T>
            </View>
          ) : null}

          <View style={s.table}>
            <View style={s.th} fixed>
              <T style={[s.thText, s.cIdx]}>#</T>
              <T style={[s.thText, s.cDesc]}>תיאור</T>
              <T style={[s.thText, s.cQty]}>כמות</T>
              <T style={[s.thText, s.cUnit]}>מחיר ליחידה</T>
              <T style={[s.thText, s.cTotal, { textAlign: "left" }]}>סה״כ</T>
            </View>
            {q.items.map((it, i) => (
              <View key={i} style={s.tr} wrap={false}>
                <N style={{ ...s.cIdx, color: MUTED }}>{String(i + 1)}</N>
                <T style={s.cDesc}>{it.description}</T>
                <N style={s.cQty}>{formatNumber(it.quantity)}</N>
                <N style={s.cUnit}>{formatILS(Math.round(it.unitPrice * 100))}</N>
                <N style={{ ...s.cTotal, fontWeight: 600 }} align="left">{formatILS(lineTotalAgorot(it))}</N>
              </View>
            ))}
          </View>

          <View style={s.totals} wrap={false}>
            <View style={s.totRow}>
              <T style={{ color: MUTED }}>סכום ביניים</T>
              <N>{formatILS(q.subtotalAgorot)}</N>
            </View>
            <View style={s.totRow}>
              <T style={{ color: MUTED }}>{q.vatEnabled ? "מע״מ 18%" : "מע״מ"}</T>
              {q.vatEnabled ? <N>{formatILS(q.vatAgorot)}</N> : <T>ללא</T>}
            </View>
            <View style={s.grand}>
              <T style={{ fontWeight: 700, fontSize: 11.5 }}>סה״כ לתשלום</T>
              <N style={{ fontWeight: 700, fontSize: 11.5 }}>{formatILS(q.totalAgorot)}</N>
            </View>
          </View>

          {q.notes ? (
            <View style={s.notes} wrap={false}>
              <T style={{ fontWeight: 600, marginBottom: 4 }}>הערות</T>
              {q.notes.split("\n").map((l, i) => (
                <T key={i} style={{ lineHeight: 1.5, color: "#374151" }}>{l || " "}</T>
              ))}
            </View>
          ) : null}
        </View>

        <View style={s.footer} fixed>
          <T style={s.footerText}>מסמך זה הינו הצעת מחיר ואינו מהווה חשבונית מס</T>
          <Text
            style={[s.footerText, { direction: "ltr" }]}
            render={({ pageNumber, totalPages }) => `BizBot · ${pageNumber}/${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
