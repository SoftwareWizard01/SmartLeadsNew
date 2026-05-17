import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Overview';
      case '/leads':
        return 'Leads Management';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-surface-800 bg-surface-900/50 backdrop-blur-md px-6 shadow-sm z-10 sticky top-0">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            {getTitle()}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
