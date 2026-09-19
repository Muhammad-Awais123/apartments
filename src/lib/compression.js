import imageCompression from "browser-image-compression";

export async function compressImage(file, options = {}) {
  const defaultOptions = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: "image/webp",
    ...options
  };

  try {
    const compressedBlob = await imageCompression(file, defaultOptions);
    // Convert blob to base64 Data URL for persistent storage in IndexedDB
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          dataUrl: reader.result,
          originalSize: (file.size / 1024).toFixed(1) + " KB",
          compressedSize: (compressedBlob.size / 1024).toFixed(1) + " KB",
          name: file.name.replace(/\.[^/.]+$/, "") + ".webp",
          type: "image/webp"
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedBlob);
    });
  } catch (error) {
    console.warn("Image compression failed, falling back to original base64:", error);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          dataUrl: reader.result,
          originalSize: (file.size / 1024).toFixed(1) + " KB",
          compressedSize: (file.size / 1024).toFixed(1) + " KB",
          name: file.name,
          type: file.type
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
