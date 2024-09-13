import { Trash } from 'phosphor-react';

import checked from "../assets/checked.svg";
import checkedHover from "../assets/checkedHover.svg";

import styles from "./Task.module.css";

import { useEffect, useState } from "react";

interface TaskProps{
  task: string;
  isChecked: boolean;
  onDeleteTask: (taskToDelete: string) => void;
  onCheckTask: (taskToCheck: string, taskIsChecked: boolean) => void;
}

export function Task({ task, isChecked, onDeleteTask, onCheckTask }: TaskProps){
  const [isTagChecked, setIsTagChecked] = useState(isChecked);
  const [isHovering, setIsHovering] = useState(false);


  function handleCheck(){
    setIsTagChecked(prevState => !prevState)
  }

  function handleChangeIsHovering(){
    setIsHovering(prevState => !prevState);
  }

  function handleDeleteTask(){
    onDeleteTask(task);
  }

  useEffect(() => {
    onCheckTask(task, isTagChecked);

  },[isTagChecked])

  return(
    <div className={styles.task}>
      <button 
        className={`${styles.circle} ${isTagChecked ? styles.noBorder : styles.border}`} 
        onClick={handleCheck}
        onMouseEnter={handleChangeIsHovering}
        onMouseLeave={handleChangeIsHovering}
      >
        {isTagChecked && <img src={isHovering ? checkedHover : checked} alt="Checked"/>}
      </button>
      <p className={isTagChecked ? styles.line : ``}>{task}</p>
      <button className={styles.delete} onClick={handleDeleteTask}>
        <Trash />
      </button>
    </div>
  );
}