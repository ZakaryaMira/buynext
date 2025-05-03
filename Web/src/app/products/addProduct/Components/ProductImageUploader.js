import { useEffect, useRef, useState } from "react";

const ProductImageUploader = ({ images, onUpload }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null); // ✅ For triggering file input when drop zone is clicked

  // Générer les aperçus dès que des fichiers sont uploadés
  useEffect(() => {
    if (images.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Nettoyer les objets URL pour éviter les fuites de mémoire
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClick = () => {
    fileInputRef.current.click(); // ✅ Trigger file picker
  };

  return (
    <div className="space-y-4">
      {/* Zone de dépôt et clic pour upload */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <p className="text-gray-600">Glissez-déposez des images ici ou cliquez pour en sélectionner</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden" // ✅ Input is hidden but clickable via container
        />
      </div>

      {/* Aperçu des images uploadées */}
      {previewUrls.length > 0 && (
        <div className="flex gap-4 flex-wrap mt-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="w-32 h-32 relative rounded overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={url}
                alt={`Aperçu ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
