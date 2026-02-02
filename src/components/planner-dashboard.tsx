"use client";

import { useTasks } from "@/lib/hooks/use-tasks";
import AddTaskForm from "./add-task-form";
import TaskList from "./task-list";

export default function PlannerDashboard() {
  const { tasks, loading, addTask, toggleTaskCompletion, deleteTask } = useTasks();

  return (
    <div className="container mx-auto max-w-5xl">
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={toggleTaskCompletion}
        onDelete={deleteTask}
      />
    </div>
  );
}
