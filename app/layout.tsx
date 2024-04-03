import "./globals.css";

export const metadata: Metadata = {
  title: "Trello Clone",
  description: "My clone Trello",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black/90 min-h-full">{children}</body>
    </html>
  );
}
