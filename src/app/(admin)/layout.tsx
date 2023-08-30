import 'easymde/dist/easymde.min.css'
import './index.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head lang='jp' />
      <body>{children}</body>
    </html>
  );
}