import styles from "@/assets/styles/page.module.css";

import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { t } from "i18next";

import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  onChange?: (value: string) => void;
}

export const SearchBox: FC<Props> = memo(({ onChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    setSearchValue(target.value);
  };

  useEffect(() => {
    onChange?.(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <section className="m-1 w-100">
      <input
        className={styles.input}
        type="text"
        placeholder={t('search')}
        onChange={handleInput}
      />
    </section>
  );
});
SearchBox.displayName = "SearchBox";
