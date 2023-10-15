import ProvidersWrapper from "./ProvidersWrapper";
import "tailwindcss/tailwind.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata = {
  title: "MatPlan",
  description: "Handle your shopping and recipes in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <ProvidersWrapper>
          <Header/>
          <main className="flex flex-col bg-c4 p-5 grow overflow-y-auto">
            {children}
          </main>
        </ProvidersWrapper>
        <Footer />
      </body>
    </html>
  );
}
