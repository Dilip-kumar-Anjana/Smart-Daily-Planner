import { Task } from "@/lib/types";
import TaskItem from "./task-item";
import { TaskItemSkeleton } from "./task-item-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <TaskItemSkeleton key={i} />
            ))}
        </CardContent>
       </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 text-center py-16">
            <ClipboardList className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No tasks yet!</h3>
            <p className="text-muted-foreground">
              Add a new task using the form above to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completeTasks = tasks.filter(task => task.completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks ({incompleteTasks.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
             <div className="text-center py-8 text-muted-foreground">
                <p>Great job! All tasks are completed.</p>
             </div>
        )}
        
        {completeTasks.length > 0 && (
          <div className="pt-8">
            <h3 className="text-lg font-medium mb-4 text-muted-foreground">Completed ({completeTasks.length})</h3>
            <div className="space-y-4">
              {completeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
