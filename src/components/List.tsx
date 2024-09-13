import { ClipboardText } from "phosphor-react";

import styles from "./List.module.css";

export function List(){
  return(
    <div className={styles.list}>
      <ClipboardText size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}