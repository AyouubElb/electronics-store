"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Upload,
  ImageIcon,
  Wand2,
  RefreshCcw,
  Sliders,
  Save,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react";

export default function ArtisticFilterPlayground() {
  const [image, setImage] = useState<string | null>(null);
  const [filteredImage, setFilteredImage] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(
    null
  );
  const [intensity, setIntensity] = useState(50);
  const [filter, setFilter] = useState("watercolor");
  const [isLoading, setIsLoading] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showProcessingAnimation, setShowProcessingAnimation] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState("filters");

  // Color adjustment values
  const [temperature, setTemperature] = useState(0);
  const [tint, setTint] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filteredCanvasRef = useRef<HTMLCanvasElement>(null);

  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const colors = {
    cream: "#FAE6B1",
    orange: "#FFA101",
    lightBlue: "#B3DEE5",
    darkTeal: "#31525B",
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      drawOriginalImage(img);
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error("Error loading image");
      setIsLoading(false);
    };
    img.src = image;
  }, [image]);

  const drawOriginalImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxWidth = 500;
    const maxHeight = 400;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    setOriginalImageData(ctx.getImageData(0, 0, width, height));
  };

  const resetImage = () => {
    if (!originalImageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setTemperature(0);
    setTint(0);
    setSaturation(0);
    setIntensity(50);

    ctx.putImageData(originalImageData, 0, 0);
    setFilteredImage(null);
  };

  const applyFilter = () => {
    setIsLoading(true);
    setProcessingProgress(0);
    setShowProcessingAnimation(true);

    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    setTimeout(() => {
      const canvas = canvasRef.current;
      const filteredCanvas = filteredCanvasRef.current;
      if (!canvas || !filteredCanvas) {
        setIsLoading(false);
        setShowProcessingAnimation(false);
        clearInterval(progressInterval);
        return;
      }

      const ctx = canvas.getContext("2d");
      const filteredCtx = filteredCanvas.getContext("2d");
      if (!ctx || !filteredCtx) {
        setIsLoading(false);
        setShowProcessingAnimation(false);
        clearInterval(progressInterval);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      filteredCanvas.width = width;
      filteredCanvas.height = height;

      filteredCtx.clearRect(0, 0, width, height);
      filteredCtx.drawImage(canvas, 0, 0);

      const imageData = filteredCtx.getImageData(0, 0, width, height);

      applyColorAdjustments(imageData.data);

      const intensityFactor = intensity / 100;

      switch (filter) {
        case "original":
          break;
        case "watercolor":
          applyWatercolorFilter(imageData.data, width, height, intensityFactor);
          break;
        case "oilPainting":
          applyOilPaintingFilter(
            imageData.data,
            width,
            height,
            intensityFactor
          );
          break;
        case "pixelate":
          applyPixelateFilter(imageData.data, width, height, intensityFactor);
          break;
        case "vintage":
          applyVintageFilter(imageData.data, width, height, intensityFactor);
          break;
        case "sketch":
          applySketchFilter(imageData.data, width, height, intensityFactor);
          break;
        case "pastel":
          applyPastelFilter(imageData.data, width, height, intensityFactor);
          break;
        case "abstract":
          applyAbstractFilter(imageData.data, width, height, intensityFactor);
          break;
      }

      filteredCtx.putImageData(imageData, 0, 0);

      setFilteredImage(filteredCanvas.toDataURL());

      setProcessingProgress(100);

      setTimeout(() => {
        setShowProcessingAnimation(false);
        setShowSuccessAnimation(true);

        setTimeout(() => {
          setShowSuccessAnimation(false);
          setIsLoading(false);
        }, 1500);
      }, 500);

      clearInterval(progressInterval);
    }, 800);
  };

  const applyColorAdjustments = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      let newR = r + temperature * 2.5;
      let newG = g + (temperature > 0 ? temperature * 1.5 : 0);
      let newB = b - temperature * 2.5;

      newG = newG + (tint < 0 ? -tint * 2 : 0);
      newR = newR + (tint > 0 ? tint * 2 : 0);
      newB = newB + (tint > 0 ? tint * 2 : 0);

      newR = Math.min(255, Math.max(0, newR));
      newG = Math.min(255, Math.max(0, newG));
      newB = Math.min(255, Math.max(0, newB));

      const luminance = 0.299 * newR + 0.587 * newG + 0.114 * newB;

      if (saturation !== 0) {
        const satFactor = 1 + saturation / 50;
        newR = luminance + satFactor * (newR - luminance);
        newG = luminance + satFactor * (newG - luminance);
        newB = luminance + satFactor * (newB - luminance);

        newR = Math.min(255, Math.max(0, newR));
        newG = Math.min(255, Math.max(0, newG));
        newB = Math.min(255, Math.max(0, newB));
      }

      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;
    }
  };

  const applyWatercolorFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!tempCtx) return;

    const tempImageData = new ImageData(
      new Uint8ClampedArray(data),
      width,
      height
    );
    tempCtx.putImageData(tempImageData, 0, 0);

    tempCtx.filter = `blur(${Math.max(1, Math.floor(4 * intensity))}px)`;
    tempCtx.drawImage(tempCanvas, 0, 0);

    tempCtx.filter = `saturate(${100 + 30 * intensity}%)`;
    tempCtx.drawImage(tempCanvas, 0, 0);

    tempCtx.globalCompositeOperation = "overlay";
    tempCtx.globalAlpha = 0.1 * intensity;

    for (let i = 0; i < 3; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 50 * intensity + 10;

      const gradient = tempCtx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      tempCtx.fillStyle = gradient;
      tempCtx.beginPath();
      tempCtx.arc(x, y, radius, 0, Math.PI * 2);
      tempCtx.fill();
    }

    tempCtx.globalCompositeOperation = "source-over";
    tempCtx.globalAlpha = 1.0;

    const processedData = tempCtx.getImageData(0, 0, width, height).data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = processedData[i];
      data[i + 1] = processedData[i + 1];
      data[i + 2] = processedData[i + 2];
    }
  };

  const applyOilPaintingFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const radius = Math.max(2, Math.floor(5 * intensity));
    const intensityLevels = Math.floor(intensity * 20) + 1;
    const tempData = new Uint8ClampedArray(data);

    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const pixelIndex = (y * width + x) * 4;

        const intensityBuckets: {
          r: number;
          g: number;
          b: number;
          count: number;
        }[] = Array(intensityLevels)
          .fill(null)
          .map(() => ({ r: 0, g: 0, b: 0, count: 0 }));

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const sampleIndex = ((y + dy) * width + (x + dx)) * 4;
            const r = tempData[sampleIndex];
            const g = tempData[sampleIndex + 1];
            const b = tempData[sampleIndex + 2];

            const intensity = Math.floor(
              (((r + g + b) / 3) * intensityLevels) / 255
            );
            const bucketIndex = Math.min(
              intensityLevels - 1,
              Math.max(0, intensity)
            );

            intensityBuckets[bucketIndex].r += r;
            intensityBuckets[bucketIndex].g += g;
            intensityBuckets[bucketIndex].b += b;
            intensityBuckets[bucketIndex].count++;
          }
        }

        let maxCount = 0;
        let maxBucket = 0;

        for (let i = 0; i < intensityLevels; i++) {
          if (intensityBuckets[i].count > maxCount) {
            maxCount = intensityBuckets[i].count;
            maxBucket = i;
          }
        }

        if (maxCount > 0) {
          data[pixelIndex] = intensityBuckets[maxBucket].r / maxCount;
          data[pixelIndex + 1] = intensityBuckets[maxBucket].g / maxCount;
          data[pixelIndex + 2] = intensityBuckets[maxBucket].b / maxCount;
        }
      }
    }

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(
        255,
        Math.max(0, data[i] + (data[i] - 128) * intensity * 0.7)
      );
      data[i + 1] = Math.min(
        255,
        Math.max(0, data[i + 1] + (data[i + 1] - 128) * intensity * 0.7)
      );
      data[i + 2] = Math.min(
        255,
        Math.max(0, data[i + 2] + (data[i + 2] - 128) * intensity * 0.7)
      );
    }
  };

  const applyPixelateFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const pixelSize = Math.max(2, Math.floor(20 * intensity));
    const tempData = new Uint8ClampedArray(data);

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            r += tempData[index];
            g += tempData[index + 1];
            b += tempData[index + 2];
            count++;
          }
        }

        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
        }

        for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
          }
        }
      }
    }
  };

  const applyVintageFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const newR = Math.min(
        255,
        (r * 0.393 + g * 0.769 + b * 0.189) * intensity + r * (1 - intensity)
      );
      const newG = Math.min(
        255,
        (r * 0.349 + g * 0.686 + b * 0.168) * intensity + g * (1 - intensity)
      );
      const newB = Math.min(
        255,
        (r * 0.272 + g * 0.534 + b * 0.131) * intensity + b * (1 - intensity)
      );

      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;

      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);
      const centerX = width / 2;
      const centerY = height / 2;

      const dx = (x - centerX) / centerX;
      const dy = (y - centerY) / centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const vignette = Math.pow(
        Math.cos((Math.min(1, distance) * Math.PI) / 2),
        2.5 * intensity
      );

      data[i] = data[i] * vignette;
      data[i + 1] = data[i + 1] * vignette;
      data[i + 2] = data[i + 2] * vignette;

      if (intensity > 0.5) {
        const grain = (Math.random() - 0.5) * intensity * 30;
        data[i] = Math.min(255, Math.max(0, data[i] + grain));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
      }
    }
  };

  const applySketchFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const tempData = new Uint8ClampedArray(data.length);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      tempData[i] = tempData[i + 1] = tempData[i + 2] = gray;
      tempData[i + 3] = data[i + 3]; // Copy alpha
    }

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pixelIndex = (y * width + x) * 4;

        const gx =
          -1 * tempData[((y - 1) * width + (x - 1)) * 4] +
          -2 * tempData[(y * width + (x - 1)) * 4] +
          -1 * tempData[((y + 1) * width + (x - 1)) * 4] +
          1 * tempData[((y - 1) * width + (x + 1)) * 4] +
          2 * tempData[(y * width + (x + 1)) * 4] +
          1 * tempData[((y + 1) * width + (x + 1)) * 4];

        const gy =
          -1 * tempData[((y - 1) * width + (x - 1)) * 4] +
          -2 * tempData[((y - 1) * width + x) * 4] +
          -1 * tempData[((y - 1) * width + (x + 1)) * 4] +
          1 * tempData[((y + 1) * width + (x - 1)) * 4] +
          2 * tempData[((y + 1) * width + x) * 4] +
          1 * tempData[((y + 1) * width + (x + 1)) * 4];

        const magnitude = Math.sqrt(gx * gx + gy * gy);

        const threshold = 40 - intensity * 30;
        const lineStrength = 1 + intensity * 2;

        let value = 255;
        if (magnitude > threshold) {
          value = 255 - magnitude * lineStrength;
          value = Math.max(0, Math.min(255, value));
        }

        const noise = (Math.random() - 0.5) * intensity * 10;
        value = Math.max(0, Math.min(255, value + noise));

        data[pixelIndex] = value;
        data[pixelIndex + 1] = value;
        data[pixelIndex + 2] = value;
      }
    }
  };

  const applyPastelFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!tempCtx) return;

    const tempImageData = new ImageData(
      new Uint8ClampedArray(data),
      width,
      height
    );
    tempCtx.putImageData(tempImageData, 0, 0);

    tempCtx.filter = `blur(${Math.max(1, Math.floor(2 * intensity))}px)`;
    tempCtx.drawImage(tempCanvas, 0, 0);

    const processedData = tempCtx.getImageData(0, 0, width, height).data;

    for (let i = 0; i < data.length; i += 4) {
      const r = processedData[i];
      const g = processedData[i + 1];
      const b = processedData[i + 2];

      const newR = Math.min(255, r + (255 - r) * intensity * 0.6);
      const newG = Math.min(255, g + (255 - g) * intensity * 0.6);
      const newB = Math.min(255, b + (255 - b) * intensity * 0.6);

      const avg = (newR + newG + newB) / 3;
      const desaturationFactor = intensity * 0.4;

      data[i] =
        newR * (1 - desaturationFactor) +
        (avg * 0.5 + 127.5) * desaturationFactor;
      data[i + 1] =
        newG * (1 - desaturationFactor) +
        (avg * 0.5 + 127.5) * desaturationFactor;
      data[i + 2] =
        newB * (1 - desaturationFactor) +
        (avg * 0.5 + 127.5) * desaturationFactor;
    }
  };

  const applyAbstractFilter = (
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number
  ) => {
    const blockSize = Math.max(5, Math.floor(20 * intensity));
    const tempData = new Uint8ClampedArray(data);

    for (let y = 0; y < height; y += blockSize) {
      for (let x = 0; x < width; x += blockSize) {
        const useGradient = Math.random() > 0.5;

        if (useGradient) {
          const startX = x;
          const startY = y;
          const endX = Math.min(x + blockSize, width);
          const endY = Math.min(y + blockSize, height);

          const startColor = {
            r: tempData[(y * width + x) * 4],
            g: tempData[(y * width + x) * 4 + 1],
            b: tempData[(y * width + x) * 4 + 2],
          };

          const endColor = {
            r: tempData[
              (Math.min(y + blockSize - 1, height - 1) * width +
                Math.min(x + blockSize - 1, width - 1)) *
                4
            ],
            g: tempData[
              (Math.min(y + blockSize - 1, height - 1) * width +
                Math.min(x + blockSize - 1, width - 1)) *
                4 +
                1
            ],
            b: tempData[
              (Math.min(y + blockSize - 1, height - 1) * width +
                Math.min(x + blockSize - 1, width - 1)) *
                4 +
                2
            ],
          };

          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;

              const progress = (dx + dy) / (2 * blockSize);
              data[index] =
                startColor.r * (1 - progress) + endColor.r * progress;
              data[index + 1] =
                startColor.g * (1 - progress) + endColor.g * progress;
              data[index + 2] =
                startColor.b * (1 - progress) + endColor.b * progress;
            }
          }
        } else {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              r += tempData[index];
              g += tempData[index + 1];
              b += tempData[index + 2];
              count++;
            }
          }

          r = r / count;
          g = g / count;
          b = b / count;

          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
            }
          }
        }
      }
    }

    if (intensity > 0.5) {
      const numShapes = Math.floor(intensity * 10);

      for (let i = 0; i < numShapes; i++) {
        const shapeType = Math.floor(Math.random() * 3);
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = Math.floor(Math.random() * 50 * intensity) + 10;

        const colorIndex =
          (Math.floor(Math.random() * height) * width +
            Math.floor(Math.random() * width)) *
          4;
        const r = tempData[colorIndex];
        const g = tempData[colorIndex + 1];
        const b = tempData[colorIndex + 2];

        if (shapeType === 0) {
          const rectWidth = Math.min(size, width - x);
          const rectHeight = Math.min(size, height - y);

          for (let dy = 0; dy < rectHeight; dy++) {
            for (let dx = 0; dx < rectWidth; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              if (index >= 0 && index < data.length) {
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
              }
            }
          }
        } else if (shapeType === 1) {
          const radius = size / 2;

          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              if (dx * dx + dy * dy <= radius * radius) {
                const px = Math.floor(x + dx);
                const py = Math.floor(y + dy);

                if (px >= 0 && px < width && py >= 0 && py < height) {
                  const index = (py * width + px) * 4;
                  data[index] = r;
                  data[index + 1] = g;
                  data[index + 2] = b;
                }
              }
            }
          }
        } else {
          const endX = x + Math.floor(Math.random() * size * 2) - size;
          const endY = y + Math.floor(Math.random() * size * 2) - size;

          const dx = Math.abs(endX - x);
          const dy = Math.abs(endY - y);
          const sx = x < endX ? 1 : -1;
          const sy = y < endY ? 1 : -1;
          let err = dx - dy;

          let currentX = x;
          let currentY = y;

          while (true) {
            if (
              currentX >= 0 &&
              currentX < width &&
              currentY >= 0 &&
              currentY < height
            ) {
              const index = (currentY * width + currentX) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
            }

            if (currentX === endX && currentY === endY) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
              err -= dy;
              currentX += sx;
            }
            if (e2 < dx) {
              err += dx;
              currentY += sy;
            }
          }
        }
      }
    }
  };

  const downloadImage = () => {
    if (!filteredImage) return;

    const link = document.createElement("a");
    link.download = `filtered-image-${filter}.png`;
    link.href = filteredImage;
    link.click();
  };

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
    setShowFullscreen(true);
    setZoomLevel(1);
  };

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setZoomLevel((prev) => Math.min(prev + 0.25, 3));
    } else {
      setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
    }
  };

  const toggleCompareMode = () => {
    setCompareMode((prev) => !prev);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const ColorGradient = ({
    from,
    to,
    value,
    min,
    max,
  }: {
    from: string;
    to: string;
    value: number;
    min: number;
    max: number;
  }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className="relative h-2 rounded-full overflow-hidden mt-1 mb-3">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(to right, ${from}, ${to})`,
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-white border border-gray-400 rounded-full shadow-sm"
          style={{
            left: `calc(${percentage}% - 2px)`,
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#B3DEE5] to-[#FAE6B1] p-3 sm:p-6 font-sans transition-opacity duration-700 ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap");

        :root {
          --font-heading: "Playfair Display", serif;
          --font-body: "Poppins", sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-heading);
        }

        body,
        p,
        button,
        input,
        select {
          font-family: var(--font-body);
        }

        .filter-card {
          transition: all 0.3s ease;
        }

        .filter-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .image-preview {
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .image-preview:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .slider-thumb {
          transition: transform 0.2s ease;
        }

        .slider-thumb:hover {
          transform: scale(1.2);
        }

        .clip-path-right {
          clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out;
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-pulse-button {
          animation: pulseButton 2s infinite;
        }

        @keyframes pulseButton {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-success {
          animation: success 1.5s ease-out;
        }

        @keyframes success {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 640px) {
          .mobile-full-width {
            width: 100% !important;
          }

          .mobile-stack {
            flex-direction: column !important;
          }

          .mobile-text-center {
            text-align: center !important;
          }

          .mobile-p-2 {
            padding: 0.5rem !important;
          }

          .mobile-text-sm {
            font-size: 0.875rem !important;
          }
        }

        /* Add this to the existing styles */
        .drag-over {
          background-color: rgba(255, 161, 1, 0.2) !important;
          border-color: #ffa101 !important;
          transform: scale(1.01);
        }

        /* Custom slider styles */
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: #e2e8f0;
          outline: none;
          margin: 10px 0;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #31525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #ffa101;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #31525b;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #ffa101;
        }

        /* Custom modal styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-content {
          background-color: #1a1a1a;
          border-radius: 0.5rem;
          max-width: 95vw;
          max-height: 95vh;
          overflow: hidden;
          position: relative;
        }

        /* Image container styles */
        .image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .image-container img,
        .image-container canvas {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>

      <div className="max-w-6xl mx-auto animate-slide-up">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#31525B] mb-1 md:mb-2 tracking-tight">
            Artistic Filter Studio
          </h1>
          <p className="text-[#31525B] text-base md:text-lg max-w-2xl mx-auto">
            Transform your photos with professional-grade artistic filters and
            adjustments
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-8 border border-[#B3DEE5]/30 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                  <button
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-[#FFA101] hover:bg-[#FF8C00] text-white px-4 py-2 h-auto transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoading}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    <span className="text-sm md:text-base">Upload Image</span>
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {image && (
                    <button
                      onClick={resetImage}
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-[#31525B] text-[#31525B] hover:bg-[#B3DEE5]/10 px-3 py-2 h-auto transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isLoading || !originalImageData}
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      <span className="text-sm md:text-base">Reset</span>
                    </button>
                  )}
                </div>

                {!image && (
                  <div
                    className="border-2 border-dashed border-[#B3DEE5] rounded-lg p-4 md:p-6 text-center bg-[#FAE6B1]/10 mb-4 transition-all duration-300 hover:bg-[#FAE6B1]/20 cursor-pointer"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <ImageIcon className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-2 text-[#31525B]/60" />
                    <p className="text-[#31525B] mb-1 text-sm md:text-base">
                      Drag & drop your image here or click to upload
                    </p>
                    <p className="text-[#31525B]/60 text-xs md:text-sm">
                      Supports JPG, PNG and GIF
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-lg border bg-white shadow-sm mb-6 border-[#B3DEE5]/30 transition-shadow duration-300 hover:shadow-md">
                <div className="p-3 sm:p-6">
                  <div className="w-full">
                    <div className="grid grid-cols-2 mb-4 md:mb-6 bg-[#B3DEE5]/20 p-1 rounded-lg">
                      <button
                        className={`flex items-center justify-center rounded-md py-1 md:py-2 text-sm md:text-base transition-all duration-300 ${
                          activeTab === "filters"
                            ? "bg-[#31525B] text-white"
                            : "hover:bg-[#B3DEE5]/30"
                        }`}
                        onClick={() => setActiveTab("filters")}
                      >
                        <Wand2 className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                        Filters
                      </button>
                      <button
                        className={`flex items-center justify-center rounded-md py-1 md:py-2 text-sm md:text-base transition-all duration-300 ${
                          activeTab === "adjustments"
                            ? "bg-[#31525B] text-white"
                            : "hover:bg-[#B3DEE5]/30"
                        }`}
                        onClick={() => setActiveTab("adjustments")}
                      >
                        <Sliders className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                        Color Adjustments
                      </button>
                    </div>

                    <div
                      className={`space-y-4 md:space-y-6 animate-fade-in ${
                        activeTab === "filters" ? "block" : "hidden"
                      }`}
                    >
                      <div>
                        <div className="font-medium mb-2 md:mb-3 text-[#31525B] text-base md:text-lg">
                          Filter Type
                        </div>
                        <div className="relative">
                          <div
                            className="flex items-center justify-between px-3 py-2 border border-[#B3DEE5] rounded-md bg-white cursor-pointer h-10 md:h-12 transition-all duration-300 hover:border-[#FFA101]"
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                          >
                            <span>
                              {filter.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                          {isSelectOpen && (
                            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-[#B3DEE5] rounded-md shadow-lg max-h-60 overflow-auto">
                              {[
                                "original",
                                "watercolor",
                                "oilPainting",
                                "pixelate",
                                "vintage",
                                "sketch",
                                "pastel",
                                "abstract",
                              ].map((filterType) => (
                                <div
                                  key={filterType}
                                  className={`px-3 py-2 cursor-pointer hover:bg-[#B3DEE5]/20 ${
                                    filter === filterType
                                      ? "bg-[#31525B] text-white"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setFilter(filterType);
                                    setIsSelectOpen(false);
                                  }}
                                >
                                  {filterType.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2 md:mb-3">
                          <span className="font-medium text-[#31525B] text-base md:text-lg">
                            Filter Intensity
                          </span>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#FFA101]/30 bg-[#FAE6B1]/50 text-[#31525B]">
                            {intensity}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={intensity}
                          onChange={(e) =>
                            setIntensity(Number.parseInt(e.target.value))
                          }
                          className="w-full"
                          disabled={!image || isLoading}
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mt-4 md:mt-6">
                        {[
                          "original",
                          "watercolor",
                          "oilPainting",
                          "pixelate",
                          "vintage",
                          "sketch",
                          "pastel",
                          "abstract",
                        ].map((filterType) => (
                          <div
                            key={filterType}
                            className={`filter-card cursor-pointer rounded-lg p-2 text-center ${
                              filter === filterType
                                ? "bg-[#31525B] text-white"
                                : "bg-[#B3DEE5]/10 hover:bg-[#B3DEE5]/30 text-[#31525B]"
                            } transition-all duration-300`}
                            onClick={() => setFilter(filterType)}
                          >
                            <div className="text-xs md:text-sm capitalize mb-1">
                              {filterType.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`space-y-4 md:space-y-6 animate-fade-in ${
                        activeTab === "adjustments" ? "block" : "hidden"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-[#31525B] text-base md:text-lg">
                            Temperature
                          </span>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#FFA101]/30 bg-[#FAE6B1]/50 text-[#31525B]">
                            {temperature}
                          </span>
                        </div>
                        <div className="text-xs flex justify-between mb-1">
                          <span className="text-blue-500 font-medium">
                            Blue
                          </span>
                          <span className="text-yellow-500 font-medium">
                            Yellow
                          </span>
                        </div>
                        <ColorGradient
                          from="#3b82f6"
                          to="#facc15"
                          value={temperature}
                          min={-50}
                          max={50}
                        />
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          step="1"
                          value={temperature}
                          onChange={(e) =>
                            setTemperature(Number.parseInt(e.target.value))
                          }
                          className="w-full"
                          disabled={!image || isLoading}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-[#31525B] text-base md:text-lg">
                            Tint
                          </span>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#FFA101]/30 bg-[#FAE6B1]/50 text-[#31525B]">
                            {tint}
                          </span>
                        </div>
                        <div className="text-xs flex justify-between mb-1">
                          <span className="text-green-500 font-medium">
                            Green
                          </span>
                          <span className="text-pink-500 font-medium">
                            Magenta
                          </span>
                        </div>
                        <ColorGradient
                          from="#22c55e"
                          to="#ec4899"
                          value={tint}
                          min={-50}
                          max={50}
                        />
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          step="1"
                          value={tint}
                          onChange={(e) =>
                            setTint(Number.parseInt(e.target.value))
                          }
                          className="w-full"
                          disabled={!image || isLoading}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-[#31525B] text-base md:text-lg">
                            Saturation
                          </span>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#FFA101]/30 bg-[#FAE6B1]/50 text-[#31525B]">
                            {saturation}
                          </span>
                        </div>
                        <div className="text-xs flex justify-between mb-1">
                          <span className="text-gray-500 font-medium">
                            Less
                          </span>
                          <span className="text-gray-500 font-medium">
                            More
                          </span>
                        </div>
                        <ColorGradient
                          from="#9ca3af"
                          to="#f87171"
                          value={saturation + 100}
                          min={0}
                          max={200}
                        />
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          step="1"
                          value={saturation}
                          onChange={(e) =>
                            setSaturation(Number.parseInt(e.target.value))
                          }
                          className="w-full"
                          disabled={!image || isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={applyFilter}
                  className={`inline-flex items-center justify-center rounded-md font-medium transition-colors w-full bg-[#31525B] hover:bg-[#31525B]/90 text-white py-2 md:py-3 text-base md:text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none ${
                    !isLoading && image && !filteredImage
                      ? "animate-pulse-button"
                      : ""
                  }`}
                  disabled={!image || isLoading}
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Image...
                    </span>
                  ) : (
                    "Apply Changes"
                  )}
                </button>

                {showProcessingAnimation && (
                  <div className="w-full bg-[#B3DEE5]/20 rounded-lg p-2 animate-fade-in">
                    <div className="flex justify-between mb-1 text-xs text-[#31525B]">
                      <span>Processing...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#B3DEE5]/20">
                      <div
                        className="h-full w-full flex-1 bg-[#FFA101] transition-all"
                        style={{
                          transform: `translateX(-${
                            100 - processingProgress
                          }%)`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {filteredImage && (
                  <button
                    onClick={downloadImage}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors w-full bg-[#FFA101] hover:bg-[#FF8C00] text-white py-2 md:py-3 text-base md:text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-5 w-5" /> Save Image
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-center mb-0">
                <h2 className="text-xl md:text-2xl font-bold text-[#31525B] mb-0 font-heading">
                  Before & After
                </h2>
                <p className="text-[#31525B]/70 text-xs md:text-sm mb-1">
                  See the transformation in real-time
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4 mt-1">
                <div className="rounded-lg border overflow-hidden border-[#B3DEE5]/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative bg-[#FAE6B1]/20 p-3 flex items-center justify-center h-[200px] md:h-[280px] overflow-hidden">
                    <div className="absolute top-2 right-2 z-10 bg-[#31525B]/80 text-white text-xs font-medium py-1 px-2 rounded-full">
                      Original
                    </div>
                    <div className="image-container">
                      {image ? (
                        <>
                          <canvas
                            ref={canvasRef}
                            className="rounded shadow-sm image-preview object-contain"
                          />
                          <canvas
                            ref={filteredCanvasRef}
                            className="hidden" // Hidden canvas for processing
                          />
                        </>
                      ) : (
                        <div className="text-center text-[#31525B] flex flex-col items-center">
                          <ImageIcon className="h-12 md:h-16 w-12 md:w-16 mb-2 opacity-50" />
                          <span className="font-medium text-sm md:text-base">
                            Original Image
                          </span>
                          <span className="text-xs md:text-sm text-[#31525B]/60 mt-1">
                            Upload an image to get started
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#31525B] text-white py-2 px-3 md:px-4 flex justify-between items-center">
                    <span className="font-medium text-sm md:text-base">
                      Original
                    </span>
                    {image && (
                      <button
                        className="text-white hover:bg-[#31525B]/80 p-1 h-auto transition-all duration-300"
                        onClick={() => image && openFullscreen(image)}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden border-[#FFA101]/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative bg-[#FAE6B1]/20 p-3 flex items-center justify-center h-[200px] md:h-[280px] overflow-hidden relative">
                    <div className="absolute top-2 right-2 z-10 bg-[#FFA101]/80 text-white text-xs font-medium py-1 px-2 rounded-full">
                      {filter.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="image-container">
                      {isLoading ? (
                        <div className="text-center text-[#31525B] flex flex-col items-center">
                          <div className="w-12 md:w-16 h-12 md:h-16 border-4 border-[#FFA101] border-t-transparent rounded-full animate-spin mb-2"></div>
                          <span className="font-medium text-sm md:text-base">
                            Processing...
                          </span>
                          <span className="text-xs md:text-sm text-[#31525B]/60 mt-1">
                            Applying artistic filters
                          </span>
                        </div>
                      ) : filteredImage ? (
                        <>
                          <img
                            src={filteredImage || "/placeholder.svg"}
                            alt="Filtered image"
                            className="rounded shadow-sm image-preview object-contain"
                          />
                          {showSuccessAnimation && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="relative">
                                <Sparkles className="h-16 w-16 text-[#FFA101] animate-success" />
                                <div className="absolute inset-0 bg-white/30 blur-xl rounded-full animate-sparkle"></div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center text-[#31525B] flex flex-col items-center">
                          <ImageIcon className="h-12 md:h-16 w-12 md:w-16 mb-2 opacity-50" />
                          <span className="font-medium text-sm md:text-base">
                            Filtered Image
                          </span>
                          <span className="text-xs md:text-sm text-[#31525B]/60 mt-1">
                            Apply filters to see the result
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#FFA101] text-white py-2 px-3 md:px-4 flex justify-between items-center">
                    <span className="font-medium text-sm md:text-base">
                      {filter.replace(/([A-Z])/g, " $1").trim()} Filter
                    </span>
                    {filteredImage && (
                      <div className="flex gap-2">
                        <button
                          className="text-white hover:bg-[#FFA101]/80 p-1 h-auto transition-all duration-300"
                          onClick={() =>
                            filteredImage && openFullscreen(filteredImage)
                          }
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {filteredImage && (
                <div className="mt-1 md:mt-2 flex flex-col items-center animate-fade-in">
                  <button
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-[#31525B] bg-white text-[#31525B] hover:bg-[#B3DEE5]/10 mb-1 transition-all duration-300 text-sm md:text-base px-3 py-1"
                    onClick={toggleCompareMode}
                  >
                    {compareMode
                      ? "Exit Compare Mode"
                      : "Compare Before & After"}
                  </button>
                  <p className="text-[#31525B]/70 text-xs italic">
                    Click the expand icon to view your image in fullscreen
                  </p>
                </div>
              )}

              {showFullscreen && (
                <div
                  className="modal-backdrop"
                  onClick={() => setShowFullscreen(false)}
                >
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full h-[90vh] flex items-center justify-center bg-[#1a1a1a] overflow-hidden">
                      <div className="absolute top-4 right-4 flex gap-2 z-20">
                        <button
                          className="inline-flex items-center justify-center rounded-full bg-[#31525B]/80 text-white hover:bg-[#31525B] border-none h-10 w-10 transition-all duration-300"
                          onClick={() => handleZoom("in")}
                        >
                          <ZoomIn className="h-5 w-5" />
                        </button>
                        <button
                          className="inline-flex items-center justify-center rounded-full bg-[#31525B]/80 text-white hover:bg-[#31525B] border-none h-10 w-10 transition-all duration-300"
                          onClick={() => handleZoom("out")}
                        >
                          <ZoomOut className="h-5 w-5" />
                        </button>
                        <button
                          className="inline-flex items-center justify-center rounded-full bg-[#31525B]/80 text-white hover:bg-[#31525B] border-none h-10 w-10 transition-all duration-300"
                          onClick={() => setShowFullscreen(false)}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {compareMode &&
                      fullscreenImage === filteredImage &&
                      image ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img
                              src={image || "/placeholder.svg"}
                              alt="Original"
                              className="max-w-full max-h-full object-contain"
                              style={{
                                transform: `scale(${zoomLevel})`,
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                          <div
                            className="absolute inset-0 flex items-center justify-center clip-path-right"
                            style={{
                              clipPath:
                                "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                            }}
                          >
                            <img
                              src={filteredImage || "/placeholder.svg"}
                              alt="Filtered"
                              className="max-w-full max-h-full object-contain"
                              style={{
                                transform: `scale(${zoomLevel})`,
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white -translate-x-1/2"></div>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
                              vs
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={fullscreenImage || ""}
                          alt="Fullscreen view"
                          className="max-w-full max-h-full object-contain"
                          style={{
                            transform: `scale(${zoomLevel})`,
                            transition: "transform 0.3s ease",
                          }}
                        />
                      )}

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#31525B]/80 text-white py-2 px-4 rounded-full text-sm transition-all duration-300">
                        Zoom: {Math.round(zoomLevel * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-[#31525B]/70 text-xs md:text-sm mt-4 md:mt-8">
          <p>
            Artistic Filter Studio © {new Date().getFullYear()} | Create
            beautiful artistic effects with ease
          </p>
        </div>
      </div>
    </div>
  );
}
