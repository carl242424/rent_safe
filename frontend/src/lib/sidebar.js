import { createIcons, LayoutDashboard, CarFront, CalendarDays, Users, ShieldAlert, LogOut, UploadCloud } from 'lucide';

export function initSidebar(api) {
  createIcons({
    icons: { LayoutDashboard, CarFront, CalendarDays, Users, ShieldAlert, LogOut, UploadCloud },
    attrs: { 'stroke-width': 1.8, 'aria-hidden': 'true' },
  });

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    const button = document.getElementById('logout-btn');
    button?.setAttribute('disabled', 'true');
    await fetch(`${api}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    window.location.href = '/';
  });
}