import Header from '@/widget/header/ui';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
}
