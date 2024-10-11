import logo from "../assets/logo.svg";
import { PlusCircle } from "phosphor-react";

import styles from "./Header.module.css";

import { ChangeEvent, FormEvent, useState } from "react";

interface HeaderProps{
  tasks: string[];
  setTasks:  React.Dispatch<React.SetStateAction<string[]>>;
}

export function Header({ tasks, setTasks }: HeaderProps){
  const [newTaskText, setNewTaskText] = useState("");

  function handleTypeTask(event: ChangeEvent<HTMLInputElement>){
    setNewTaskText(event.target.value);
  }

  function handleCreateTask(event: FormEvent){
    event.preventDefault();

    setTasks([...tasks, newTaskText]);
    setNewTaskText("");
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return(
    <header className={styles.header}>
      <img src={logo} alt="ToDo logo" />

        <form onSubmit={handleCreateTask}>
          <input 
            type="text" 
            placeholder="Add a new task"
            value={newTaskText}
            onChange={handleTypeTask}
          />
          <button type="submit" disabled={isNewTaskEmpty}>
            Create
            <PlusCircle size={16} />
          </button>
        </form>
    </header>
  );
}