import { useState, useRef } from "react";
import ImageUploader from "../components/ImageUploader";
import CardEditor from "../components/CardEditor";

export default function Home() {
  const [templateImage, setTemplateImage] = useState(null);
  const [textInputs, setTextInputs] = useState({
    dear: "",
    message: "",
    from: "",
  });
  const [errors, setErrors] = useState({
    dear: "",
    message: "",
    from: "",
  });
  const [downloadError, setDownloadError] = useState("");
  const canvasRef = useRef(null);

  const handleInputChange = (field, value) => {
    let error = "";

    if (field === "dear" || field === "from") {
      if (value.length > 16) {
        error = `${field === "dear" ? "Dear" : "From"} maksimal 16 karakter!`;
      }
    } else if (field === "message") {
      if (value.length > 50) {
        error = "Pesan maksimal 50 karakter!";
      }
    }

    if (value.trim() === "") {
      error = `${
        field === "dear" ? "Dear" : field === "from" ? "From" : "Message"
      } tidak boleh kosong!`;
    }

    setTextInputs((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const downloadImage = () => {
    if (!templateImage) {
      setDownloadError("Silakan upload gambar terlebih dahulu!");
      return;
    }

    if (Object.values(textInputs).some((value) => value.trim() === "")) {
      setDownloadError("Semua kolom harus diisi!");
      return;
    }

    if (Object.values(errors).some((error) => error !== "")) {
      setDownloadError("Perbaiki error pada input sebelum mendownload!");
      return;
    }

    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "greeting-card.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
      setDownloadError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Gift Card
        </h1>

        {templateImage && (
          <CardEditor
            templateImage={templateImage}
            textInputs={textInputs}
            onCanvasReady={(canvas) => (canvasRef.current = canvas)}
          />
        )}

        <ImageUploader onImageUpload={setTemplateImage} />

        <div className="mt-4">
          <input
            type="text"
            placeholder="To (Dear)"
            value={textInputs.dear}
            onChange={(e) => handleInputChange("dear", e.target.value)}
            className="border w-full p-2 mb-1 text-[14px]"
          />
          {errors.dear && <p className="text-red-500 text-sm">{errors.dear}</p>}

          <textarea
            placeholder="Write your message here"
            value={textInputs.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="border w-full p-2 mb-1 text-[14px]"
            rows="3"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}

          <input
            type="text"
            placeholder="From"
            value={textInputs.from}
            onChange={(e) => handleInputChange("from", e.target.value)}
            className="border w-full p-2 mb-1 text-[14px]"
          />
          {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
        </div>

        {downloadError && (
          <p className="text-red-500 text-center mt-2">{downloadError}</p>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={downloadImage}
            className="mt-4 w-[200px] py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
