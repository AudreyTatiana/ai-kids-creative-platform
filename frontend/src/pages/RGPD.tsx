import Layout from "../components/Layout";
import Container from "../components/Container";
import "./LegalPage.css";

function RGPD() {
  return (
    <Layout>
      <section className="legal-section">
        <Container>
          <div className="legal-card">
            <div className="legal-card__header">
              <p className="section-badge">Juridique</p>
              <h1 className="legal-card__title">Politique de confidentialité</h1>
              <p className="legal-card__meta">
                Conforme au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)<br />
                Dernière mise à jour : 1er janvier 2026
              </p>
            </div>

            <div className="legal-body">

              <LegalSection title="1. Responsable du traitement">
                <p>
                  Le responsable du traitement de vos données personnelles est :
                </p>
                <p>
                  <strong>PetitsRêves SAS</strong><br />
                  Email : <a href="mailto:contact@petitsreves.com" className="legal-link">contact@petitsreves.com</a>
                </p>
                <p>
                  Pour toute question relative à vos données personnelles, vous pouvez contacter notre
                  Délégué à la Protection des Données (DPO) à l'adresse :{" "}
                  <a href="mailto:dpo@petitsreves.com" className="legal-link">dpo@petitsreves.com</a>
                </p>
              </LegalSection>

              <LegalSection title="2. Données collectées">
                <p>Dans le cadre de l'utilisation de la plateforme, nous collectons les données suivantes :</p>

                <p><strong>Données d'identité et de contact</strong></p>
                <ul>
                  <li>Prénom, nom, adresse email, numéro de téléphone (optionnel)</li>
                  <li>Adresse postale (uniquement pour les livraisons physiques)</li>
                </ul>

                <p><strong>Données liées aux commandes</strong></p>
                <ul>
                  <li>Historique des commandes, produits choisis, thèmes sélectionnés</li>
                  <li>Mode de livraison, montants payés</li>
                  <li>Identifiant de session de paiement Stripe (aucune donnée bancaire n'est stockée par PetitsRêves)</li>
                </ul>

                <p><strong>Données liées à l'utilisation de l'IA</strong></p>
                <ul>
                  <li>Photos téléchargées pour la génération d'images par intelligence artificielle</li>
                  <li>Images générées par l'IA</li>
                </ul>

                <p><strong>Données techniques</strong></p>
                <ul>
                  <li>Adresse IP, type de navigateur, données de connexion</li>
                </ul>
              </LegalSection>

              <LegalSection title="3. Finalités du traitement">
                <p>Vos données sont collectées pour les finalités suivantes :</p>
                <ul>
                  <li><strong>Gestion du compte utilisateur</strong> : création et gestion de votre espace personnel</li>
                  <li><strong>Exécution des commandes</strong> : traitement, paiement et livraison de vos créations</li>
                  <li><strong>Génération IA</strong> : traitement de vos photos par notre moteur d'intelligence artificielle pour produire les créations commandées</li>
                  <li><strong>Communication</strong> : envoi d'emails transactionnels (confirmation de commande, réinitialisation de mot de passe, bienvenue)</li>
                  <li><strong>Amélioration du service</strong> : analyse anonymisée de l'utilisation de la plateforme</li>
                  <li><strong>Obligations légales</strong> : conservation des données de facturation conformément aux obligations légales</li>
                </ul>
              </LegalSection>

              <LegalSection title="4. Base légale des traitements">
                <ul>
                  <li><strong>Exécution du contrat</strong> (art. 6.1.b RGPD) : traitement des commandes, gestion du compte</li>
                  <li><strong>Consentement</strong> (art. 6.1.a RGPD) : traitement des photos par l'IA, acceptation des CGU</li>
                  <li><strong>Intérêt légitime</strong> (art. 6.1.f RGPD) : amélioration du service, sécurité de la plateforme</li>
                  <li><strong>Obligation légale</strong> (art. 6.1.c RGPD) : conservation des données de facturation (10 ans)</li>
                </ul>
              </LegalSection>

              <LegalSection title="5. Traitement des photos d'enfants — Données sensibles">
                <p>
                  Les photos téléchargées contenant des images d'enfants constituent des données à caractère personnel
                  particulièrement sensibles. PetitsRêves s'engage à :
                </p>
                <ul>
                  <li>Ne jamais utiliser les photos à des fins autres que la réalisation de la commande</li>
                  <li>Ne jamais partager, vendre ni exploiter commercialement les photos ou les créations générées</li>
                  <li>Supprimer définitivement les photos originales de nos serveurs dans un délai maximum de <strong>30 jours</strong> après la livraison de la commande</li>
                  <li>Stocker les photos sur des serveurs sécurisés situés dans l'Union Européenne</li>
                  <li>Appliquer un chiffrement en transit (HTTPS) et au repos</li>
                </ul>
              </LegalSection>

              <LegalSection title="6. Durée de conservation des données">
                <ul>
                  <li><strong>Données de compte</strong> : conservées pendant toute la durée d'activité du compte, puis supprimées dans les 3 ans suivant la dernière connexion</li>
                  <li><strong>Photos téléchargées</strong> : supprimées dans les 30 jours suivant la livraison</li>
                  <li><strong>Données de commande et de facturation</strong> : conservées 10 ans conformément aux obligations comptables légales</li>
                  <li><strong>Données de connexion (logs)</strong> : conservées 12 mois</li>
                </ul>
              </LegalSection>

              <LegalSection title="7. Partage des données avec des tiers">
                <p>PetitsRêves ne vend jamais vos données personnelles. Les données peuvent être partagées uniquement avec :</p>
                <ul>
                  <li><strong>Stripe</strong> (paiement sécurisé) — traite les données de paiement selon sa propre politique de confidentialité</li>
                  <li><strong>Prestataires d'hébergement</strong> — hébergement des données sur des serveurs situés dans l'UE</li>
                  <li><strong>Transporteurs</strong> — uniquement le nom, prénom et adresse pour les livraisons physiques</li>
                  <li><strong>Autorités légales</strong> — uniquement sur réquisition judiciaire</li>
                </ul>
              </LegalSection>

              <LegalSection title="8. Vos droits">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul>
                  <li><strong>Droit d'accès</strong> (art. 15) : obtenir une copie de vos données</li>
                  <li><strong>Droit de rectification</strong> (art. 16) : corriger des données inexactes</li>
                  <li><strong>Droit à l'effacement</strong> (art. 17) : demander la suppression de vos données (« droit à l'oubli »)</li>
                  <li><strong>Droit à la limitation</strong> (art. 18) : limiter le traitement de vos données</li>
                  <li><strong>Droit à la portabilité</strong> (art. 20) : recevoir vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition</strong> (art. 21) : vous opposer au traitement de vos données</li>
                  <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement à tout moment</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez notre DPO à :{" "}
                  <a href="mailto:dpo@petitsreves.com" className="legal-link">dpo@petitsreves.com</a>.
                  Nous répondrons dans un délai maximum de <strong>30 jours</strong>.
                </p>
                <p>
                  Vous avez également le droit d'introduire une réclamation auprès de la{" "}
                  <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :{" "}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="legal-link">www.cnil.fr</a>
                </p>
              </LegalSection>

              <LegalSection title="9. Sécurité des données">
                <p>
                  PetitsRêves met en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                  vos données contre tout accès non autorisé, perte, destruction ou divulgation :
                </p>
                <ul>
                  <li>Chiffrement des communications (HTTPS/TLS)</li>
                  <li>Hachage des mots de passe (bcrypt)</li>
                  <li>Authentification par token JWT à durée limitée</li>
                  <li>Accès aux données restreint au personnel habilité</li>
                  <li>Sauvegardes régulières chiffrées</li>
                </ul>
              </LegalSection>

              <LegalSection title="10. Cookies">
                <p>
                  La plateforme PetitsRêves utilise uniquement des cookies strictement nécessaires au fonctionnement
                  du service (authentification, panier). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
                </p>
              </LegalSection>

              <LegalSection title="11. Modification de la politique de confidentialité">
                <p>
                  PetitsRêves se réserve le droit de modifier la présente politique à tout moment. En cas de
                  modification substantielle, vous serez informé par email avec un préavis de 15 jours.
                  La version en vigueur est celle affichée sur la plateforme avec sa date de mise à jour.
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

export default RGPD;
