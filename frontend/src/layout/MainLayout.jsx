import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">

      <Navbar />

      <main className="pt-20">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;