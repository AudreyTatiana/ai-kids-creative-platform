import Container from "./Container";
import packImages from "../assets/images/pack-images.png";
import albumPhotos from "../assets/images/album-photos.png";
import histoirePersonnalisee from "../assets/images/histoire-personalisee.png";
import "./ExamplesSection.css";

const examples = [
  {
    title: "Pack d'images",
    description: "4 illustrations IA uniques de votre enfant transporté dans un univers magique de votre choix",
    image: packImages,
  },
  {
    title: "Album photos",
    description: "Un album photo luxueux avec votre enfant illustré en héros, imprimé et livré chez vous",
    image: albumPhotos,
  },
  {
    title: "Histoire personnalisée",
    description: "Un livre illustré sur mesure où votre enfant est le héros de sa propre aventure magique",
    image: histoirePersonnalisee,
  },
];

function ExamplesSection() {
  return (
    <section className="examples-section" id="exemples">
      <Container>
        <h2 className="examples-section__title">Exemples de créations</h2>

        <div className="examples-section__grid">
          {examples.map((ex) => (
            <ExampleCard key={ex.title} {...ex} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type ExampleCardProps = {
  title: string;
  description: string;
  image: string;
};

function ExampleCard({ title, description, image }: ExampleCardProps) {
  return (
    <div className="example-card">
      <div className="example-card__frame">
        <img src={image} alt={title} className="example-card__image" />
      </div>
      <div className="example-card__body">
        <h3 className="example-card__title">{title}</h3>
        <p className="example-card__desc">{description}</p>
      </div>
    </div>
  );
}

export default ExamplesSection;
