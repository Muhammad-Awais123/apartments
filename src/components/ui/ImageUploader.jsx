import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Star, Check, Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import { compressImage } from "../../lib/compression";
import { Button } from "./Button";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

export function ImageUploader({
  images = [],
  onChange,
  maxFiles = 10,
  maxSizeMB = 5,
  allowCover = true,
  label = "Upload High-Resolution Photos"
}) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = async (acceptedFiles) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} photos allowed.`);
      return;
    }

    setIsCompressing(true);
    setUploadProgress(10);
    const newItems = [];

    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        setUploadProgress(Math.round(((i + 1) / acceptedFiles.length) * 90));
        const compressed = await compressImage(file);
        newItems.push({
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          url: compressed.dataUrl,
          name: compressed.name,
          size: compressed.compressedSize,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          isCover: images.length === 0 && i === 0
        });
      }

      const updated = [...images, ...newItems];
      onChange(updated);
      toast.success(`${newItems.length} photo(s) compressed & uploaded.`);
    } catch (error) {
      toast.error("Failed to process images.");
      console.error(error);
    } finally {
      setIsCompressing(false);
      setUploadProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic"] },
    maxSize: maxSizeMB * 1024 * 1024,
    disabled: isCompressing || images.length >= maxFiles
  });

  const handleDelete = (index) => {
    const updated = images.filter((_, i) => i !== index);
    if (images[index]?.isCover && updated.length > 0) {
      updated[0].isCover = true;
    }
    onChange(updated);
  };

  const handleSetCover = (index) => {
    const updated = images.map((img, i) => ({
      ...img,
      isCover: i === index
    }));
    onChange(updated);
  };

  const handleAltChange = (index, alt) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  return (
    <div className="w-full space-y-4">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
            {label} ({images.length}/{maxFiles})
          </label>
          <span className="text-[11px] text-ink-400">
            JPG, PNG, WebP up to {maxSizeMB}MB (Auto WebP compression)
          </span>
        </div>
      )}

      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center",
          isDragActive
            ? "border-gold-500 bg-gold-50/50 dark:bg-gold-950/20 scale-[1.01]"
            : "border-ink-200 dark:border-ink-700 bg-cream-50/30 dark:bg-ink-900/30 hover:border-gold-400 hover:bg-gold-50/20",
          (isCompressing || images.length >= maxFiles) && "opacity-60 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-12 h-12 rounded-xl bg-gold-100 dark:bg-gold-950/50 text-gold-600 flex items-center justify-center mb-3">
          {isCompressing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>

        {isCompressing ? (
          <div className="space-y-2 w-full max-w-xs">
            <p className="text-sm font-semibold text-ink-800 dark:text-white">
              Compressing & Optimizing to WebP...
            </p>
            <div className="w-full bg-ink-200 dark:bg-ink-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-ink-800 dark:text-white">
              {isDragActive
                ? "Drop photos here..."
                : "Drag & drop photos here, or browse files"}
            </p>
            <p className="text-xs text-ink-400 mt-1">
              Supports desktop file upload & mobile camera capture
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => {
            const url = typeof img === "string" ? img : img.url;
            const isCover = typeof img === "object" ? img.isCover : idx === 0;
            const size = typeof img === "object" ? img.size : null;
            const alt = typeof img === "object" ? img.alt : "";

            return (
              <div
                key={img.id || idx}
                className="group relative rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative aspect-video w-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                  <img
                    src={url}
                    alt={alt || `Photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-ink-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-2">
                    {allowCover && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(idx)}
                        title="Set as cover image"
                        className={cn(
                          "p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 shadow-md transition-all",
                          isCover
                            ? "bg-gold-500 text-white font-bold shadow-sm"
                            : "bg-white/90 text-ink-800 hover:bg-gold-400"
                        )}
                      >
                        <Star className="w-3.5 h-3.5" />
                        {isCover ? "Cover" : "Set Cover"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md ml-auto"
                      title="Delete photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isCover && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-md shadow-md uppercase tracking-wider">
                      Cover Photo
                    </span>
                  )}
                </div>

                {/* Alt text field & size metadata */}
                {typeof img === "object" && (
                  <div className="p-2 space-y-1">
                    <input
                      type="text"
                      placeholder="Alt text / description..."
                      value={alt}
                      onChange={(e) => handleAltChange(idx, e.target.value)}
                      className="w-full text-[11px] px-2 py-1 bg-ink-50 dark:bg-ink-800 rounded border border-ink-200 dark:border-ink-700 text-ink-800 dark:text-ink-200 focus:outline-none focus:border-gold-500"
                    />
                    {size && (
                      <div className="text-[9px] text-ink-400 text-right">
                        Optimized: {size}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
