import { useRef, useEffect, useState } from "react";

const CardEditor = ({ templateImage, textInputs, onCanvasReady }) => {
  const canvasRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateCanvasSize = (imageWidth, imageHeight) => {
    const maxWidth = window.innerWidth * 0.8; // Maksimal 80% lebar layar
    const aspectRatio = imageWidth / imageHeight;

    let newWidth = imageWidth;
    let newHeight = imageHeight;

    if (imageWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = maxWidth / aspectRatio;
    }

    setCanvasDimensions({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    if (templateImage) {
      const image = new Image();
      image.onload = () => {
        updateCanvasSize(image.width, image.height);
        setTimeout(() => drawCanvas(image), 0);
      };
      image.src = templateImage;
    }
  }, [templateImage, textInputs]);

  const drawCanvas = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.font = `${
      canvas.width * 0.03
    }px 'Edu Australia VIC WA NT Hand Precursive', cursive`;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";

    // Posisi teks dihitung berdasarkan proporsi dimensi canvas
    const dearPosition = {
      x: canvas.width * 0.48,
      y: canvas.height * 0.32,
    };
    const messageStartPosition = {
      x: canvas.width * 0.3,
      y: canvas.height * 0.4,
    };
    const fromPosition = {
      x: canvas.width * 0.44,
      y: canvas.height * 0.57,
    };

    // Menampilkan teks pada posisi yang dihitung
    if (textInputs.dear) {
      ctx.fillText(
        textInputs.dear.slice(0, 16),
        dearPosition.x,
        dearPosition.y
      );
    }

    if (textInputs.message) {
      const message = textInputs.message.slice(0, 50); // Maksimal 50 karakter
      const lines = message.match(/.{1,25}/g) || []; // Pisahkan teks ke dalam beberapa baris
      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          messageStartPosition.x,
          messageStartPosition.y + i * (canvas.height * 0.05)
        );
      });
    }

    if (textInputs.from) {
      ctx.fillText(
        textInputs.from.slice(0, 16),
        fromPosition.x,
        fromPosition.y
      );
    }

    // Notify parent component
    onCanvasReady(canvas);
  };

  return (
    <canvas
      ref={canvasRef}
      className="border mx-auto my-4"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

export default CardEditor;
