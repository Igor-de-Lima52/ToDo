import { ClipboardText } from "phosphor-react";

import styles from "./List.module.css";

export function List(){
  return(
    <div className={styles.list}>
      <ClipboardText size={56} />
      <strong>You don't have tasks registered yet</strong>
      <p>Create tasks and organize your to-do list</p>
    </div>
  );
}