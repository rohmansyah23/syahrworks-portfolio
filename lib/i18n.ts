import { ui as enUI } from "@/data/ui/en";
import { ui as idUI } from "@/data/ui/id";
import * as enData from "@/data/en";
import * as idData from "@/data/id";

export type Locale = "en" | "id";

export const locales = ["en", "id"] as const;

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Await params Next.js lalu kembalikan locale valid (fallback: defaultLocale). */
export async function resolveLang(
  params: Promise<{ lang?: string }>
): Promise<Locale> {
  const { lang } = await params;
  return lang && isLocale(lang) ? lang : defaultLocale;
}

export type UIStrings = {
  /* Navigasi */
  navHome: string;
  navAbout: string;
  navJourney: string;
  navBlog: string;
  navProjects: string;
  /* Header */
  themeLight: string;
  themeDark: string;
  openMenu: string;
  closeMenu: string;
  switchToEnglish: string;
  switchToIndonesian: string;
  /* Footer */
  footerNavigations: string;
  footerContact: string;
  footerSocial: string;
  footerBuiltWith: string;
  /* Hero */
  heroViewProjects: string;
  heroViewJourney: string;
  heroAboutMe: string;
  heroGetInTouch: string;
  /* Label micro editorial */
  homeLabel: string;
  aboutLabel: string;
  journeyLabel: string;
  blogLabel: string;
  projectsLabel: string;
  getInTouchLabel: string;
  techStackLabel: string;
  pinnedReposLabel: string;
  contactLabel: string;
  /* Judul & filter halaman */
  journeyTitle: string;
  projectsTitle: string;
  blogTitle: string;
  all: string;
  /* Get In Touch */
  getInTouchTitle: string;
  getInTouchDescription: string;
  /* Tech Stack */
  techStackTitle: string;
  techStackDescription: string;
  /* Pinned Repos */
  pinnedReposTitle: string;
  pinnedReposDescription: string;
  pinnedReposViewAll: string;
  pinnedReposUnavailable: string;
  pinnedReposFallback: string;
  pinnedReposNoDescription: string;
  /* Latest Blogs */
  latestBlogsLabel: string;
  latestBlogsTitle: string;
  latestBlogsViewAll: string;
  /* Contact Form */
  contactTitle: string;
  contactDescription: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactMessageLabel: string;
  contactNamePlaceholder: string;
  contactEmailPlaceholder: string;
  contactMessagePlaceholder: string;
  contactSend: string;
  contactSending: string;
  contactErrorName: string;
  contactErrorEmail: string;
  contactErrorMessage: string;
  contactErrorEndpoint: string;
  contactSuccess: string;
  contactErrorSend: string;
  /* Blog */
  blogSearchPlaceholder: string;
  blogSearchAria: string;
  blogEmpty: string;
  blogBack: string;
  blogWrittenBy: string;
  blogNotFound: string;
  /* Projects */
  projectsEmpty: string;
  projectView: string;
  projectRole: string;
  projectTechStack: string;
  projectLiveDemo: string;
  projectDocs: string;
  /* Journey */
  journeyEmpty: string;
  journeyTypeExperience: string;
  journeyTypeFullTime: string;
  journeyTypePartTime: string;
  journeyTypeEducation: string;
  journeyTypeCertification: string;
  journeyTypeCompetition: string;
  /* About */
  aboutTitle: string;
  aboutEngineeringPhilosophy: string;
  aboutWorkingStyle: string;
  aboutFavoriteTech: string;
  aboutFactLocation: string;
  aboutFactProjects: string;
  aboutFactCertifications: string;
  aboutFactCurrent: string;
  aboutShipped: string;
  aboutCvButton: string;
  aboutCvDialogDescription: string;
  aboutOpenNewTab: string;
  aboutCvMobileHint: string;
  /* Gallery */
  galleryFullView: string;
  /* Intro halaman */
  blogIntro: string;
  projectsIntro: string;
  journeyIntro: string;
  /* 404 */
  notFoundBody: string;
  notFoundBackHome: string;
};

export const dictionaries: Record<Locale, UIStrings> = {
  en: enUI,
  id: idUI,
};

export function getDictionary(lang: Locale): UIStrings {
  return dictionaries[lang];
}

const dataByLocale = { en: enData, id: idData } as const;

export function getData(lang: Locale) {
  return dataByLocale[lang];
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** "/about" → "/en/about" (untuk "/" → "/en"). */
export function localePath(lang: Locale, path: string): string {
  return `/${lang}${path === "/" ? "" : path}`;
}
