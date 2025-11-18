export const copyToClipboard = (text) => {
  let nav = navigator || window.navigator;
  if (nav && nav.clipboard && nav.clipboard.writeText) {
    nav.clipboard.writeText(text);
    return
  }
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  let t = $('dialog[open]');
  if (!t) t = document.body;
  t.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  t.removeChild(tempInput);
}