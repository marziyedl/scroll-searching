import styles from "@/assets/styles/page.module.css";
import { SearchBox } from "@/components/SearchBox";
import { useLazyQuery } from "@apollo/client";
import listRecipes from "@/graphql/search.gql";
import Card from "@/components/Card";
import { Input, ListRecipes, Recipe } from "@/types";
import InfiniteScroll from "@/components/InfiniteScroll";

import { useState, useEffect } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [queryInputs, setQueryInputs] = useState<Input>({
    query: "",
    pageSize: 5,
    page: 1,
  });

  const [getSearchedRecipes, { loading, fetchMore, error }] = useLazyQuery<
    ListRecipes,
    { input: Input }
  >(listRecipes, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setRecipes(data.listRecipes.recipes);
    },
  });

  const handleChange = (query: string) => {
    setQueryInputs({ ...queryInputs, query });
    getSearchedRecipes({
      variables: {
        input: { ...queryInputs, query, page: 1 },
      },
    });
  };

  useEffect(() => {
    const fetchMoreData = () => {
      const nextPage = queryInputs.page;
      fetchMore({
        variables: { input: { ...queryInputs, page: nextPage } },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newRecipes = [
            ...prev.listRecipes.recipes,
            ...fetchMoreResult.listRecipes.recipes,
          ];

          setRecipes(newRecipes);

          return {
            listRecipes: {
              ...prev.listRecipes,
              recipes: newRecipes,
            },
          };
        },
      });
    };
    if (queryInputs.page === 1) return;
    fetchMoreData();
  }, [queryInputs.page]);

  const updatePageNumer = () => {
    setQueryInputs((prevInputs) => ({
      ...prevInputs,
      page: prevInputs.page + 1,
    }));
  };

  const renderItem = (item: Recipe) => <Card key={item.id} recipe={item} />;

  return (
    <main className={styles.main}>
      <SearchBox onChange={handleChange} />
      <InfiniteScroll
        fetchData={updatePageNumer}
        renderItem={renderItem}
        isLoading={loading}
        data={recipes || []}
      />
      {error && <strong>Error...</strong>}
    </main>
  );
}
