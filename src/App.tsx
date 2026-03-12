import { useState } from 'react';
import OrdersPage from './pages/OrdersPage';
import ConfigPage from './pages/ConfigPage';
import SchedulingPage from './pages/SchedulingPage';
import AdjustmentPage from './pages/AdjustmentPage';
import { Package, Factory, CalendarDays, Wand2, User } from 'lucide-react';

type Page = 'config' | 'orders' | 'scheduling' | 'adjustment';

const navItems = [
  { id: 'config', label: '厂区概况', icon: Factory },
  { id: 'orders', label: '订单管理', icon: Package },
  { id: 'scheduling', label: 'AI排程', icon: CalendarDays },
  { id: 'adjustment', label: '计划调整', icon: Wand2 },
];

export default function App() {
  const [activePage, setActivePage] = useState<Page>('config');

  const renderPage = () => {
    switch (activePage) {
      case 'config': return <ConfigPage />;
      case 'orders': return <OrdersPage />;
      case 'scheduling': return <SchedulingPage />;
      case 'adjustment': return <AdjustmentPage />;
      default: return <ConfigPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 左侧导航 */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">冶金计划</h1>
              <p className="text-xs text-gray-500">辅助系统</p>
            </div>
          </div>
        </div>

        {/* 导航 */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id as Page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 用户信息 */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">计划员</p>
              <p className="text-xs text-gray-500">炼钢车间</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}
