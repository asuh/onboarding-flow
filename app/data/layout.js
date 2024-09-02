import Sleeve from '@/app/ui/admin/sleeve';
import './admin.css';

export default function Layout({ children }) {
  return (
    <main className="main">
      <aside className="sleeve">
        <Sleeve />
      </aside>
      <article className="torso">{children}</article>
    </main>
  );
}