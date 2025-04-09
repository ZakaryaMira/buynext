import { useEffect, useState } from "react";

const ProductImageUploader = ({ images, onUpload }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

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

  return (
    <div className="space-y-4">
      {/* Zone de dépôt */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <p className="text-gray-600">Glissez-déposez une image ici ou cliquez pour en sélectionner une</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      {/* Aperçu des images uploadées */}
      {previewUrls.length > 0 && (
        <div className="flex gap-4 flex-wrap mt-4">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Aperçu ${index + 1}`}
              className="w-32 h-32 object-cover rounded shadow-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
