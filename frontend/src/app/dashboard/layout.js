import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
