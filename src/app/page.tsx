import Header from "@/components/header";
import PlannerDashboard from "@/components/planner-dashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PlannerDashboard />
      </main>
    </div>
  );
}
