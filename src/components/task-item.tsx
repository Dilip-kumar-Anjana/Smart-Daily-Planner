"use client";

import { Task } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Briefcase, BookOpen, User, ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  Work: <Briefcase className="h-3 w-3" />,
  Study: <BookOpen className="h-3 w-3" />,
  Personal: <User className="h-3 w-3" />,
};

const categoryColors: { [key: string]: string } = {
    Work: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300",
    Study: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300",
    Personal: "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300",
}

const priorityIcons: { [key: string]: React.ReactNode } = {
  Low: <ArrowDown className="h-3 w-3" />,
  Medium: <ArrowRight className="h-3 w-3" />,
  High: <ArrowUp className="h-3 w-3" />,
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { toast } = useToast();
  
  const handleDelete = async () => {
    try {
      await onDelete(task.id);
      toast({
        title: "Task Deleted",
        description: `"${task.title}" has been removed.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task. Please try again.",
      });
    }
  };

  return (
    <Card className={cn("transition-all", task.completed && "bg-muted/50")}>
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={(checked) => onToggle(task.id, !!checked)}
            aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "font-medium truncate",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </label>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
           <Badge className={cn("hidden sm:inline-flex items-center gap-1", categoryColors[task.category])}>
            {categoryIcons[task.category]}
            {task.category}
          </Badge>
          <Badge
            variant={
              task.priority === "High"
                ? "destructive"
                : task.priority === "Medium"
                ? "warning"
                : "info"
            }
            className="inline-flex items-center gap-1"
          >
            {priorityIcons[task.priority]}
            <span className="hidden sm:inline">{task.priority}</span>
          </Badge>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the task "{task.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
