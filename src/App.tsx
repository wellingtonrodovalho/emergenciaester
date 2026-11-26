import { EmergencyCard } from './components/EmergencyCard';

export default function App() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <EmergencyCard />
      </div>
    </main>
  );
}
