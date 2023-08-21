import { Recipe } from "@/types";
import React, { useEffect } from "react";

interface InfiniteScrollProps {
  fetchData: () => void;
  renderItem: (item: Recipe) => React.ReactNode;
  isLoading: boolean;
  data: Recipe[];
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchData,
  renderItem,
  isLoading,
  data,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =window.innerHeight + document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;

      if (scrollPosition === offsetHeight)  fetchData();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <div className="row">
      {data.map((item) => (
        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
