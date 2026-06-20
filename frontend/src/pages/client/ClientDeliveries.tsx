import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import { fetchClientOrders } from "../../api/orders";
import "./ClientDeliveries.css";
import "../../components/admin/AdminTable.css";

interface Order {
  id: number;
  order_number: string;
  product: string;
  theme: string;
  delivery: string;
  amount: number;
  status: string;
  created_at: string;
  first_name: string;
  last_name: string;
}

function ClientDeliveries() {
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { setLoading(false); return; }
    const { email } = JSON.parse(stored);
    fetchClientOrders(email)
      .then((data: Order[]) => {
        const physical = Array.isArray(data)
          ? data.filter((o) => o.delivery !== "email")
          : [];
        setDeliveries(physical);
      })
      .catch(() => setDeliveries([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) =>
    Number(n).toFixed(2).replace(".", ",") + "€";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <ClientLayout>
      <div className="client-deliveries">
        <header className="client-deliveries__header">
          <h2 className="client-deliveries__title">Mes livraisons</h2>
          <p className="client-deliveries__subtitle">
            Suivez l'acheminement de vos commandes en livraison à domicile.
          </p>
        </header>

        <section className="client-deliveries__list">
          {loading ? (
            <p className="client-deliveries__empty">Chargement...</p>
          ) : deliveries.length === 0 ? (
            <p className="client-deliveries__empty">
              Aucune livraison à domicile pour l'instant.
            </p>
          ) : (
            deliveries.map((d) => {
              const deliveryStatus = getDeliveryStatus(d.status);
              return (
                <div key={d.id} className="delivery-item">
                  <div className="delivery-item__top">
                    <div>
                      <h3 className="delivery-item__product-title">{d.product}</h3>
                      <p className="delivery-item__meta">
                        Référence : #{d.order_number}
                      </p>
                      <p className="delivery-item__meta">
                        Date : {formatDate(d.created_at)}
                      </p>
                    </div>
                    <div className="delivery-item__badge-col">
                      <StatusBadge status={deliveryStatus} />
                    </div>
                  </div>

                  <div className="delivery-item__info-grid">
                    <InfoCard label="Produit" value={d.product} />
                    <InfoCard label="Thème" value={d.theme} />
                    <InfoCard
                      label="Mode de livraison"
                      value={d.delivery === "physical" ? "À domicile" : "À domicile"}
                    />
                    <InfoCard label="Montant payé" value={fmt(d.amount)} />
                  </div>

                  <div className="delivery-item__progress-track">
                    <div
                      className="delivery-item__progress-fill"
                      style={{ width: getProgressWidth(deliveryStatus) }}
                    />
                  </div>

                  <p className="delivery-item__status-msg">
                    {getStatusMessage(deliveryStatus)}
                  </p>
                </div>
              );
            })
          )}
        </section>
      </div>
    </ClientLayout>
  );
}

/** Convertit le statut de commande en statut de livraison lisible */
function getDeliveryStatus(orderStatus: string): string {
  if (orderStatus === "paid") return "En préparation";
  if (orderStatus === "pending") return "En attente de paiement";
  return "En attente";
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="delivery-info-card">
      <p className="delivery-info-card__label">{label}</p>
      <p className="delivery-info-card__value">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let badgeClass = "badge badge--inprogress";
  if (status === "En attente de paiement") badgeClass = "badge badge--preparing";
  if (status === "En préparation") badgeClass = "badge badge--shipped";
  if (status === "Expédiée") badgeClass = "badge badge--shipped";
  if (status === "Livrée") badgeClass = "badge badge--delivered";
  return <span className={badgeClass}>{status}</span>;
}

function getProgressWidth(status: string): string {
  if (status === "En attente de paiement") return "15%";
  if (status === "En préparation") return "45%";
  if (status === "Expédiée") return "75%";
  if (status === "Livrée") return "100%";
  return "10%";
}

function getStatusMessage(status: string): string {
  if (status === "En attente de paiement")
    return "Le paiement de cette commande n'a pas encore été finalisé.";
  if (status === "En préparation")
    return "Votre commande est confirmée et en cours de préparation.";
  if (status === "Expédiée")
    return "Votre commande a été expédiée et est en cours d'acheminement.";
  if (status === "Livrée")
    return "Votre commande a été livrée avec succès. Merci !";
  return "Statut en attente de mise à jour.";
}

export default ClientDeliveries;
