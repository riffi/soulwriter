export const makeCleanTextFromHtml = (html: string) => {
    const  div = document.createElement("div");
    div.innerHTML = html;
    const cleanText = div.textContent || div.innerText || "";
    return cleanText
}
