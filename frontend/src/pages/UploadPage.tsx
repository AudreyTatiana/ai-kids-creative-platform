import { useRef, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";
import "./UploadPage.css";

function UploadPage() {
  const navigate = useNavigate();
  const { setImages } = useAI();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const invalid = newFiles.find((f) => !["image/jpeg", "image/png", "image/webp"].includes(f.type));
    if (invalid) { setError("Seuls les formats JPG, PNG et WEBP sont acceptés."); return; }
    const tooBig = newFiles.find((f) => f.size > 5 * 1024 * 1024);
    if (tooBig) { setError("Chaque photo doit faire moins de 5 Mo."); return; }
    setError("");
    setSelectedFiles((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, 4);
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleContinue = () => {
    if (selectedFiles.length < 1) { setError("Veuillez sélectionner au moins 1 photo."); return; }
    setImages(selectedFiles);
    navigate("/theme");
  };

  return (
    <Layout>
      <Navbar />
      <section className="upload-section">
        <Container>
          <div className="upload-card">
            <div className="upload-card__header">
              <p className="upload-card__step">Étape 1 : Téléversez des photos</p>
              <h1 className="upload-card__title">Créez votre projet magique</h1>
              <p className="upload-card__subtitle">Importez 1 à 4 photos de votre enfant pour commencer la création.</p>
            </div>

            {/* Zone de drop */}
            <div
              className="upload-drop-zone"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            >
              <div className="upload-drop-zone__icon">⬆️</div>
              <h2 className="upload-drop-zone__title">Glissez-déposez ou cliquez pour téléverser</h2>
              <p className="upload-drop-zone__subtitle">1 à 4 photos (JPG/PNG/WEBP, max 5 Mo/photo)</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
              />
              <button className="upload-drop-zone__btn">Sélectionner des photos</button>
            </div>

            {error && <p className="upload-card__error">{error}</p>}

            {/* Aperçu des photos sélectionnées */}
            <div className="upload-previews">
              {[0, 1, 2, 3].map((i) => (
                <PreviewCard
                  key={i}
                  label={`Photo ${i + 1}`}
                  file={selectedFiles[i] || null}
                  onRemove={() => setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                />
              ))}
            </div>

            <div className="upload-bottom">
              <div className="upload-tips">
                <h3 className="upload-tips__title">Conseils qualité</h3>
                <div className="upload-tips__list">
                  <CheckItem text="Visage bien visible" />
                  <CheckItem text="Bonne lumière" />
                  <CheckItem text="Pas de lunettes / masque" />
                  <CheckItem text="Angle de face recommandé" />
                </div>
              </div>

              <div className="upload-progress">
                <h3 className="upload-progress__title">Progression</h3>
                <div className="upload-progress__bar-track">
                  <div
                    className="upload-progress__bar-fill"
                    style={{ width: selectedFiles.length > 0 ? "35%" : "5%" }}
                  />
                </div>
                <p className="upload-progress__status">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} photo(s) sélectionnée(s). Prêt pour l'étape suivante.`
                    : "Sélectionnez au moins 1 photo."}
                </p>
                <button
                  onClick={handleContinue}
                  className={`upload-progress__btn${selectedFiles.length > 0 ? " upload-progress__btn--active" : " upload-progress__btn--disabled"}`}
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function PreviewCard({ label, file, onRemove }: { label: string; file: File | null; onRemove: () => void }) {
  const url = file ? URL.createObjectURL(file) : null;
  return (
    <div>
      <div className={`preview-card__frame${file ? " preview-card__frame--filled" : ""}`}>
        {url && <img src={url} alt={label} className="preview-card__img" />}
        {file && (
          <>
            <div className="preview-card__check">✓</div>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              title="Supprimer cette photo"
              className="preview-card__remove-btn"
            >✕</button>
          </>
        )}
      </div>
      <p className="preview-card__label">{label}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="check-item">
      <span className="check-item__icon">✓</span>
      {text}
    </div>
  );
}

export default UploadPage;
