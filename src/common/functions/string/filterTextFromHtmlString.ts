export function filterTextFromHtmlString(html: string | undefined): string {
  if (!html) return "";

  try {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text;
  } catch (error) {
    console.error(error);
    return html;
  }
}
