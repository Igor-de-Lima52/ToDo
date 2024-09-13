import styles from "./MainHeader.module.css";

interface MainHeaderProps{
  createdTasks: string[]
  completedTasks: string[]
  showFilteredTasks: () => void;
  showAllTasks: () => void; 
}

export function MainHeader({ createdTasks, completedTasks, showFilteredTasks, showAllTasks }: MainHeaderProps){
  return(
    <header>
      <div className={styles.count}>
        <button onClick={showAllTasks}>
          <h3 className={styles.created}>Tarefas criadas</h3>
          <span>{createdTasks.length}</span>
        </button>
      </div>
      <div className={styles.count}>
        <button onClick={showFilteredTasks}>
          <h3 className={styles.completed}>Concluídas</h3>
          <span>{completedTasks.length} de {createdTasks.length}</span>
        </button>
      </div>
    </header>
  )
}