export const APP_TITLE = import.meta.env.VITE_APP_TITLE

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${APP_TITLE}`
  }
  return APP_TITLE
}
