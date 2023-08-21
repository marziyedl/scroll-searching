import styles from "@/assets/styles/page.module.css";

import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import { t } from "i18next";

import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  onChange?: (value: string) => void;
}

export const SearchBox: FC<Props> = memo(({ onChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);
  const isFirstRun = useRef(true);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    setSearchValue(target.value);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onChange?.(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <section className="m-1 w-100">
      <input
        className={styles.input}
        type="search"
        placeholder={t("search")}
        onChange={handleInput}
      />
    </section>
  );
});
SearchBox.displayName = "SearchBox";
