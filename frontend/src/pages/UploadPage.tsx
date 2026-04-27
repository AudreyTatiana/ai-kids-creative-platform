import { useRef, useState } from "react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIContext";

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
      return combined.slice(0, 4); // max 4 photos
    });
    // Réinitialise l'input pour permettre de resélectionner le même fichier
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
      <section style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(180deg, #fbf9ff 0%, #f3f0fb 100%)", padding: "48px 0 80px" }}>
        <Container>
          <div style={{ maxWidth: "980px", margin: "0 auto", background: "#fff", borderRadius: "28px", padding: "32px", boxShadow: "0 20px 50px rgba(117, 100, 170, 0.10)", border: "1px solid #efe9fb" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ margin: "0 0 10px", color: "#8c84c6", fontWeight: 700, fontSize: "14px" }}>Étape 1 : Téléversez des photos</p>
              <h1 style={{ margin: "0 0 10px", color: "#3d3a6d", fontSize: "36px", fontWeight: 800 }}>Créez votre projet magique</h1>
              <p style={{ margin: 0, color: "#7a7699", fontSize: "15px", lineHeight: 1.7 }}>Importez 1 à 4 photos de votre enfant pour commencer la création.</p>
            </div>

            {/* Zone de drop */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              style={{ border: "2px dashed #d9d2ef", borderRadius: "24px", background: "linear-gradient(180deg, #fcfbff 0%, #f8f5ff 100%)", padding: "34px 24px", textAlign: "center", marginBottom: "24px", cursor: "pointer" }}
            >
              <div style={{ width: "76px", height: "76px", margin: "0 auto 16px", borderRadius: "22px", background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}>⬆️</div>
              <h2 style={{ margin: "0 0 10px", color: "#3d3a6d", fontSize: "24px", fontWeight: 800 }}>Glissez-déposez ou cliquez pour téléverser</h2>
              <p style={{ margin: "0 0 18px", color: "#6f6a93", fontSize: "16px" }}>1 à 4 photos (JPG/PNG/WEBP, max 5 Mo/photo)</p>
              <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />
              <button style={{ background: "linear-gradient(135deg, #6f8fff 0%, #9c8cff 100%)", color: "#fff", border: "none", borderRadius: "14px", padding: "13px 18px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Sélectionner des photos
              </button>
            </div>

            {error && <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "16px", fontWeight: 600 }}>{error}</p>}

            {/* Aperçu des photos sélectionnées */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "26px" }}>
              {[0, 1, 2, 3].map((i) => (
                <PreviewCard
                  key={i}
                  label={`Photo ${i + 1}`}
                  file={selectedFiles[i] || null}
                  onRemove={() => setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "start" }}>
              <div style={{ background: "#f8f5ff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb" }}>
                <h3 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "22px", fontWeight: 800 }}>Conseils qualité</h3>
                <div style={{ display: "grid", gap: "12px" }}>
                  <CheckItem text="Visage bien visible" />
                  <CheckItem text="Bonne lumière" />
                  <CheckItem text="Pas de lunettes / masque" />
                  <CheckItem text="Angle de face recommandé" />
                </div>
              </div>

              <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px", border: "1px solid #eee8fb", boxShadow: "0 10px 25px rgba(117, 100, 170, 0.06)" }}>
                <h3 style={{ margin: "0 0 16px", color: "#3d3a6d", fontSize: "22px", fontWeight: 800 }}>Progression</h3>
                <div style={{ width: "100%", height: "10px", background: "#eee8fb", borderRadius: "999px", overflow: "hidden", marginBottom: "10px" }}>
                  <div style={{ width: selectedFiles.length > 0 ? "35%" : "5%", height: "100%", background: "linear-gradient(90deg, #6f8fff 0%, #f6b93b 100%)", borderRadius: "999px", transition: "width 0.3s" }} />
                </div>
                <p style={{ margin: "0 0 22px", color: "#8f89b2", fontSize: "14px" }}>
                  {selectedFiles.length > 0 ? `${selectedFiles.length} photo(s) sélectionnée(s). Prêt pour l'étape suivante.` : "Sélectionnez au moins 1 photo."}
                </p>
                <button onClick={handleContinue} style={{ width: "100%", background: selectedFiles.length > 0 ? "#f6b93b" : "#ccc", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 18px", fontSize: "15px", fontWeight: 700, cursor: selectedFiles.length > 0 ? "pointer" : "not-allowed" }}>
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
      <div style={{ position: "relative", height: "120px", borderRadius: "18px", background: "linear-gradient(135deg, #d9ccff 0%, #c6e4ff 55%, #ffe8f7 100%)", border: file ? "3px solid #8a78c7" : "1px solid #e8e2f8", boxShadow: "0 10px 20px rgba(117, 100, 170, 0.08)", marginBottom: "10px", overflow: "hidden" }}>
        {url && <img src={url} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        {file && (
          <>
            <div style={{ position: "absolute", top: "8px", right: "8px", width: "26px", height: "26px", borderRadius: "50%", background: "#6f8fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>✓</div>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              title="Supprimer cette photo"
              style={{ position: "absolute", top: "8px", left: "8px", width: "26px", height: "26px", borderRadius: "50%", background: "#e74c3c", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}
            >✕</button>
          </>
        )}
      </div>
      <p style={{ margin: 0, textAlign: "center", color: "#7a7699", fontSize: "14px", fontWeight: 700 }}>{label}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5f5989", fontSize: "15px", fontWeight: 600 }}>
      <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#ebfff1", color: "#1f9d57", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>✓</span>
      {text}
    </div>
  );
}

export default UploadPage;
