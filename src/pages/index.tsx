import styles from "@/assets/styles/page.module.css";
import { SearchBox } from "@/components/SearchBox";
import { useLazyQuery } from "@apollo/client";
import listRecipes from "@/graphql/search.gql";
import Card from "@/components/Card";
import { Input, ListRecipes, Recipe } from "@/types";
import InfiniteScroll from "@/components/InfiniteScroll";

import { useState, useEffect } from "react";
import { NAVIGATION_KEYS } from "@/utils/constant";



export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [queryInputs, setQueryInputs] = useState<Input>({
    query: "",
    pageSize: 5,
    page: 1,
  });
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [getSearchedRecipes, { loading, fetchMore }] = useLazyQuery<
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
      console.log(nextPage);
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
    if (queryInputs.page == 1) return;
    fetchMoreData();
  }, [queryInputs.page]);

  const updatePageNumer = () => {
    setQueryInputs((prevInputs) => ({
      ...prevInputs,
      page: prevInputs.page + 1,
    }));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (recipes.length === 0) {
        return;
      }
      if (!selectedCard) {
        setSelectedCard(recipes[0].id);
      } else if (e.key === NAVIGATION_KEYS.ARROW_RIGHT) {
        const nextSibling =
          document.getElementById(selectedCard)?.nextElementSibling;
        if (!nextSibling) {
          return;
        }
        setSelectedCard(nextSibling.id);
        nextSibling.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } else if (e.key === NAVIGATION_KEYS.ARROW_LEFT) {
        const previousSibling =
          document.getElementById(selectedCard)?.previousElementSibling;
        if (!previousSibling) {
          return;
        }
        setSelectedCard(previousSibling.id);
        previousSibling.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };

    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [selectedCard, recipes]);

  const handleSelect = (id: string) => {
    setSelectedCard(id);
  };

  const renderItem = (item: Recipe) => (
    <Card
      key={item.id}
      recipe={item}
      selected={item.id === selectedCard}
      handleSelect={handleSelect}
    />
  );
  
  return (
    <main className={styles.main}>
      <SearchBox onChange={handleChange} />
      <InfiniteScroll
        fetchData={updatePageNumer}
        renderItem={renderItem}
        isLoading={loading}
        data={recipes || []}
      />
    </main>
  );
}
