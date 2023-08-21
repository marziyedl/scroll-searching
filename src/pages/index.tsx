import styles from "@/assets/styles/page.module.css";
import { SearchBox } from "@/components/SearchBox";
import listRecipes from "@/graphql/search.gql";
import { Input, ListRecipes, Recipe } from "@/types";

import { useState } from "react";
import { useLazyQuery } from "@apollo/client";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [input, setInput] = useState<Input>({
    query: "",
    pageSize: 5,
    page: 1,
  });

  const [getSearchedUsers] = useLazyQuery<ListRecipes, { input: Input }>(listRecipes,
    {
      fetchPolicy: "network-only",
      onCompleted(data) {
        setRecipes(data.listRecipes.recipes);
      },
    }
  );

  const handleChange = (query: string) => {
    setInput({ ...input, query });
    getSearchedUsers({
      variables: { input: { ...input, query } },
    });
  };

  return (
    <main className={styles.main}>
      <SearchBox onChange={handleChange} />
      {recipes.length}
    </main>
  );
}
