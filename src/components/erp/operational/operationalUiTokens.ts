export const operationalUiTokens = {
  colors: {
    pageText: "text-[#10251C]",
    pageTextHex: "#10251C",
    surfaceSoft: "bg-[#F8FBF8]",
    surfaceWarm: "bg-[#FFF9EA]",
    primaryButton: "bg-[#0F8A5F] hover:bg-[#0B6F4C]",
    primaryButtonText: "text-white",
  },

  shell: {
    pageSpacing: "-mt-36 space-y-3",
    hero:
      "relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#F8FBF8] shadow-[0_24px_80px_rgba(15,23,42,0.08)]",
    contentGrid: "grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]",
  },

  cards: {
    standard:
      "rounded-[1.7rem] border border-[var(--erp-border)] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]",
    soft:
      "rounded-[1.7rem] border border-slate-100 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.05)]",
    warm:
      "rounded-[1.7rem] border border-amber-100 bg-[#FFF9EA] shadow-[0_18px_55px_rgba(146,99,12,0.10)]",
  },

  controls: {
    input:
      "h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100",
    secondaryButton:
      "h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50",
    primaryButton:
      "rounded-2xl bg-[#0F8A5F] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(15,138,95,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0B6F4C]",
  },

  typography: {
    eyebrow:
      "text-[11px] font-black uppercase tracking-[0.22em]",
    label:
      "text-[11px] font-black uppercase tracking-[0.18em] text-slate-500",
    title:
      "text-2xl font-black tracking-tight text-[#10251C] lg:text-[2.25rem]",
    body:
      "text-sm font-semibold leading-6 text-slate-600",
  },

  table: {
    wrapper:
      "overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]",
    headerCell:
      "whitespace-nowrap px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500",
    bodyCell:
      "whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#10251C]",
    row:
      "cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/45",
  },
} as const;

export type OperationalUiTokens = typeof operationalUiTokens;
