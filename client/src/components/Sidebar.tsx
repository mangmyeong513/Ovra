// src/components/SideNav.tsx
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "홈" },
  { to: "/explore", label: "탐색" },
  { to: "/notifications", label: "알림" },
  { to: "/messages", label: "메시지" },
  { to: "/bookmarks", label: "북마크" },
  { to: "/profile", label: "프로필" },
  // ⚠️ 설정은 여기 한 곳만 노출 (중복 제거)
  { to: "/settings", label: "설정" },
];

export default function SideNav() {
  return (
    <nav className="sticky top-16">
      <ul className="space-y-1">
        {nav.map((i) => (
          <li key={i.to}>
            <NavLink
              to={i.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-xl transition ${
                  isActive ? "bg-white/10" : "hover:bg-white/5"
                }`
              }
            >
              {i.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
