import styles from "@/assets/styles/page.module.css";
import { t } from "i18next";

export default function Home() {
  return <main className={styles.main}>{t("search")}</main>;
}
