export const getWindowSelectionText = () => {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.getSelection() && document.getSelection()?.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
