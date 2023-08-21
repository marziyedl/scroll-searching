import { Recipe } from "@/types";
import Image from "next/image";
import styles from "@/assets/styles/page.module.css";
type Props = {
  recipe: Recipe;
  selected: boolean;
  handleSelect: (id: string) => void;
};

export default function Card({ recipe, selected, handleSelect }: Props) {
  return (
    <div
      id={recipe.id}
      className={`col-4 col-sm-12${selected ? " box-shadow" : ""}`}
      onClick={() => handleSelect(recipe.id)}
    >
      <Image
        src={`https://i.dietdoctor.com/${recipe.images.defaultImage.path}`}
        alt="recipe"
        layout="fill"
        className={styles.image}
        placeholder="blur"
        blurDataURL={"/assets/images/blur.jpg"}
      />

      <div className="container">
        <h4>
          <b>{recipe.title}</b>
        </h4>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
}
