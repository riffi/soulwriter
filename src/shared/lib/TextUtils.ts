export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.href = url;

  tempLink.setAttribute('download', fileName);
  tempLink.click();
}


export const jsonToBlob = (json: object) => {
  const str = JSON.stringify(json);
  const bytes = new TextEncoder().encode(str);
  return new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });

}
