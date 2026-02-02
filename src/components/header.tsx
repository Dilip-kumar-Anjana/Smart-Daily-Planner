import { ListTodo } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline">
              Smart Daily Planner
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
