import Header from '@/widget/header/ui';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className="flex flex-col items-center justify-center"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {children}
      </main>
    </>
  );
}
