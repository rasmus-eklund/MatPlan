import ProvidersWrapper from './ProvidersWrapper';

export const metadata = {
  title: 'RecipeJAR',
  description: 'Handle your shopping and recipes in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
