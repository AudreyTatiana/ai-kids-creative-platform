import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

async function downloadImage(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Erreur téléchargement :", err);
    // Fallback : ouvrir dans un nouvel onglet
    window.open(url, "_blank");
  }
}
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import { fetchOrderRealisation } from "../../api/orders";
import "./RealisationPage.css";

interface RealisationData {
  orderNumber: string;
  product: string;
  theme: string;
  images: string[];
}

function RealisationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<RealisationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!stored || !token) {
      navigate(`/login?redirect=/realisation/${orderNumber}`);
      return;
    }

    const { email } = JSON.parse(stored);
    fetchOrderRealisation(orderNumber!, email)
      .then((res) => {
        if (res.message) setError(res.message);
        else setData(res);
      })
      .catch(() => setError("Erreur lors du chargement de la réalisation."))
      .finally(() => setLoading(false));
  }, [orderNumber, navigate]);

  if (loading) {
    return (
      <Layout>
        <Navbar />
        <div className="realisation-loading">
          <p className="realisation-loading__text">Chargement de votre réalisation…</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Navbar />
        <div className="realisation-error">
          <p className="realisation-error__msg">{error}</p>
          <Link to="/client/orders" className="realisation-error__link">
            ← Retour à mes commandes
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <section className="realisation-section">
        <Container>
          <div className="realisation-card">

            <div className="realisation-card__header">
              <p className="realisation-card__order-ref">Commande #{data?.orderNumber}</p>
              <h1 className="realisation-card__title">Ma réalisation IA ✨</h1>
              <p className="realisation-card__subtitle">
                {data?.product} — Thème : <strong>{data?.theme}</strong>
              </p>
            </div>

            {data?.images && data.images.length > 0 ? (
              <div className="realisation-gallery">
                {data.images.map((url, i) => (
                  <div key={i} className="realisation-gallery__item">
                    <img
                      src={url}
                      alt={`Réalisation ${i + 1}`}
                      className="realisation-gallery__img"
                    />
                    <div className="realisation-gallery__overlay">
                      <span className="realisation-gallery__num">Aperçu {i + 1}</span>
                      <button
                        onClick={() =>
                          downloadImage(
                            url,
                            `petitsreves-${data?.orderNumber}-${i + 1}.jpg`
                          )
                        }
                        className="realisation-gallery__download-btn"
                      >
                        ⬇ Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="realisation-empty">
                Aucune image disponible pour cette commande. Elle est peut-être encore en cours de préparation.
              </p>
            )}

            <div className="realisation-card__footer">
              <Link to="/client/orders" className="realisation-back-btn">
                ← Retour à mes commandes
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default RealisationPage;
