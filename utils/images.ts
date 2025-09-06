const getCroppedImg = async (imageSrc: string, croppedAreaPixels: any): Promise<string> => {
  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('No canvas context');

  const size = 200;
  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    size,
    size,
  );

  return canvas.toDataURL('image/png');
};

const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: 'image/png' });
};

export { getCroppedImg, dataURLtoBlob };
