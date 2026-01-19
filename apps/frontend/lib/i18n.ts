export type Locale = "en" | "hi";

const strings = {
  en: {
    disclaimer: "This is not a medical diagnosis. Always consult a doctor.",
  },
  hi: {
    disclaimer: "यह चिकित्सा निदान नहीं है। कृपया डॉक्टर से सलाह लें।",
  },
};

export function t(locale: Locale, key: keyof typeof strings.en): string {
  return strings[locale][key] || strings.en[key];
}
