import ProvidersWrapper from "./ProvidersWrapper";
import "tailwindcss/tailwind.css";

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
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
