export interface ListRecipes {
  listRecipes: {
    recipes: Recipe[]
  }
}
export interface Recipe {
  id: string;
  slug: string;
  satietyScore: string;
  rating: string;
  description: string;
  descriptionHtml: string;
  title: string;
  images: {
    defaultImage: {
      path: string;
    };
  };
};