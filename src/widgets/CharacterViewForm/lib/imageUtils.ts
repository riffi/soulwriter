

export const toBase64 = (file: File, width: number, height: number) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d');
        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        img.onload = () => {
            const wrh = img.width / img.height;
            let newWidth = canvas.width;
            let newHeight = newWidth / wrh;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * wrh;
            }

            ctx?.drawImage(img, (width - newWidth) / 2, (height - newHeight) /2, newWidth, newHeight);
            resolve(String(canvas.toDataURL()))

        }
        img.src = reader.result
    }
    reader.onerror = reject;
});

