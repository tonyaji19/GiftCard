import { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const [hover, setHover] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State untuk menyimpan preview gambar

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Set URL gambar untuk preview
        onImageUpload(e.target.result); // Kirim URL gambar ke parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setHover(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Set URL gambar untuk preview
        onImageUpload(e.target.result); // Kirim URL gambar ke parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setHover(true);
  };

  const handleDragLeave = () => {
    setHover(false);
  };

  return (
    <div>
      {/* <div>
        {imagePreview && (
          <div className="my-4 w-full ">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto border-2 border-gray-300 rounded "
            />
          </div>
        )}
      </div> */}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full p-6 flex flex-col items-center justify-center border-2 ${
          hover ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-300"
        } rounded-lg cursor-pointer transition-colors duration-200`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="file-upload"
        />

        {/* Label yang mencakup seluruh area */}
        <label
          htmlFor="file-upload"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-2">
            <img src="/assets/cloud.png" alt="Cloud" width={25} height={25} />
            <span className="text-black-500  font-bold">Browse Files</span>
            <p className="text-gray-500">or drag and drop files here</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
