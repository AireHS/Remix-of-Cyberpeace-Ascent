import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
