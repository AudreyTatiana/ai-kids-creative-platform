import Layout from "../components/Layout";
import Container from "../components/Container";
import "./LegalPage.css";

function CGU() {
  return (
    <Layout>
      <section className="legal-section">
        <Container>
          <div className="legal-card">
            <div className="legal-card__header">
              <p className="section-badge">Juridique</p>
              <h1 className="legal-card__title">Conditions Générales d'Utilisation</h1>
              <p className="legal-card__meta">Dernière mise à jour : 1er janvier 2026</p>
            </div>

            <div className="legal-body">

              <LegalSection title="1. Objet et acceptation">
                <p>
                  Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation
                  de la plateforme <strong>PetitsRêves</strong>, accessible à l'adresse <em>www.petitsreves.com</em>,
                  éditée par la société PetitsRêves SAS.
                </p>
                <p>
                  En créant un compte ou en utilisant les services, l'utilisateur reconnaît avoir lu, compris et accepté
                  sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement
                  d'utiliser la plateforme.
                </p>
              </LegalSection>

              <LegalSection title="2. Description des services">
                <p>PetitsRêves propose les services suivants :</p>
                <ul>
                  <li>Transformation artistique de photos d'enfants par intelligence artificielle selon un thème choisi (conte, super-héros, pirate, etc.)</li>
                  <li>Génération d'images personnalisées haute résolution</li>
                  <li>Création d'albums photo personnalisés imprimés</li>
                  <li>Livraison des créations par voie électronique (email) ou physique (courrier à domicile)</li>
                </ul>
                <p>
                  PetitsRêves se réserve le droit de modifier, suspendre ou interrompre tout ou partie des services
                  à tout moment, sans préavis, sans que cela puisse engager sa responsabilité.
                </p>
              </LegalSection>

              <LegalSection title="3. Création de compte">
                <p>
                  L'accès aux services nécessite la création d'un compte personnel. L'utilisateur s'engage à fournir
                  des informations exactes, complètes et à jour lors de son inscription.
                </p>
                <p>
                  L'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion. Toute
                  utilisation du compte avec ses identifiants est réputée effectuée par l'utilisateur lui-même.
                  En cas de perte ou de vol, l'utilisateur doit immédiatement en informer PetitsRêves.
                </p>
                <p>
                  PetitsRêves se réserve le droit de suspendre ou supprimer tout compte en cas de violation des
                  présentes CGU ou de comportement frauduleux.
                </p>
              </LegalSection>

              <LegalSection title="4. Utilisation des photos et contenus">
                <p>
                  En téléchargeant des photos sur la plateforme, l'utilisateur déclare et garantit :
                </p>
                <ul>
                  <li>Être le titulaire des droits sur les photos téléchargées ou avoir obtenu les autorisations nécessaires</li>
                  <li>Avoir l'autorité parentale ou la tutelle légale de l'enfant photographié, ou avoir obtenu le consentement des représentants légaux</li>
                  <li>Que les photos ne contiennent aucun contenu illicite, offensant, diffamatoire ou portant atteinte aux droits de tiers</li>
                </ul>
                <p>
                  PetitsRêves n'utilisera les photos téléchargées qu'aux fins de traitement par l'IA pour la réalisation
                  de la commande. Les photos ne sont pas partagées, vendues ni utilisées à des fins publicitaires.
                  Elles sont supprimées de nos serveurs dans un délai de 30 jours suivant la livraison de la commande.
                </p>
              </LegalSection>

              <LegalSection title="5. Propriété intellectuelle">
                <p>
                  Les créations générées par PetitsRêves à partir des photos de l'utilisateur sont la propriété exclusive
                  de l'utilisateur, qui en obtient une licence d'utilisation personnelle, non commerciale et non exclusive.
                </p>
                <p>
                  Toute reproduction, exploitation commerciale ou diffusion publique des créations sans accord écrit
                  préalable de PetitsRêves est interdite. La marque, le logo et l'ensemble des éléments graphiques
                  de la plateforme sont la propriété de PetitsRêves SAS et sont protégés par le droit de la propriété
                  intellectuelle.
                </p>
              </LegalSection>

              <LegalSection title="6. Prix, paiements et livraison">
                <p>
                  Les prix des services sont indiqués en euros TTC sur la plateforme. PetitsRêves se réserve le droit
                  de modifier ses tarifs à tout moment. Les prix applicables sont ceux en vigueur au moment de la commande.
                </p>
                <p>
                  Les paiements sont sécurisés et traités via <strong>Stripe</strong>. PetitsRêves ne stocke aucune
                  donnée bancaire sur ses serveurs.
                </p>
                <p>
                  Les délais de livraison pour les commandes physiques sont estimés entre 5 et 7 jours ouvrés après
                  confirmation du paiement. PetitsRêves ne peut être tenu responsable des retards imputables aux
                  transporteurs.
                </p>
              </LegalSection>

              <LegalSection title="7. Droit de rétractation">
                <p>
                  Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être
                  exercé pour les contenus numériques dont l'exécution a commencé avec l'accord préalable du consommateur.
                </p>
                <p>
                  En conséquence, dès que la génération des images par IA a démarré et que l'utilisateur en a pris
                  connaissance, il renonce expressément à son droit de rétractation pour la partie numérique de la commande.
                </p>
                <p>
                  Pour les commandes physiques (albums imprimés), le droit de rétractation s'exerce dans un délai de
                  14 jours à compter de la réception du colis, sauf si le produit a été personnalisé conformément à
                  l'article L221-28 3° du Code de la consommation.
                </p>
              </LegalSection>

              <LegalSection title="8. Responsabilité">
                <p>
                  PetitsRêves met tout en œuvre pour assurer la disponibilité et la qualité de ses services mais ne
                  peut garantir une disponibilité ininterrompue. La responsabilité de PetitsRêves ne saurait être
                  engagée en cas d'interruption du service, de perte de données ou de dommages indirects.
                </p>
                <p>
                  L'utilisateur est seul responsable de l'utilisation qu'il fait de la plateforme et des contenus
                  qu'il y télécharge. Il garantit PetitsRêves contre tout recours ou réclamation de tiers résultant
                  de son utilisation des services.
                </p>
              </LegalSection>

              <LegalSection title="9. Modification des CGU">
                <p>
                  PetitsRêves se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront
                  informés par email ou notification sur la plateforme. La poursuite de l'utilisation des services après
                  notification vaut acceptation des nouvelles CGU.
                </p>
              </LegalSection>

              <LegalSection title="10. Loi applicable et litiges">
                <p>
                  Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera
                  recherchée en priorité. À défaut, les tribunaux compétents du ressort du siège social de PetitsRêves
                  seront seuls compétents.
                </p>
                <p>
                  Conformément aux articles L611-1 et suivants du Code de la consommation, l'utilisateur peut recourir
                  à un médiateur de la consommation dans les conditions prévues par la loi.
                </p>
              </LegalSection>

              <LegalSection title="11. Contact">
                <p>
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse suivante :<br />
                  <strong>PetitsRêves SAS</strong><br />
                  Email : <a href="mailto:contact@petitsreves.com" className="legal-link">contact@petitsreves.com</a>
                </p>
              </LegalSection>

            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="legal-section-block">
      <h2 className="legal-section-block__title">{title}</h2>
      <div className="legal-section-block__content">{children}</div>
    </div>
  );
}

export default CGU;
