import { StickyNote, LayoutDashboard, Settings, Sparkles } from "lucide-react"


const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
    active 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-[1.02]' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
  }`}>
    {icon}
    {label}
  </button>
);
const SideBar = () => {
  return (
  
  
     <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <StickyNote size={20} />
          </div>
          <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Notepad.ai
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          <NavItem icon={<LayoutDashboard size={18}/>} label="All Notes" active />
          <NavItem icon={<StickyNote size={18}/>} label="Favorites" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>

        {/* Storage Widget - More modern look */}
        <div className="p-6">
          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100/50">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Storage</p>
              <Sparkles size={14} className="text-indigo-400" />
            </div>
            <div className="w-full bg-indigo-100 h-2 rounded-full mb-3 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full w-[65%] shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
            </div>
            <p className="text-xs text-slate-500 font-medium">650MB of 1GB used</p>
          </div>
        </div>
      </aside>
  )
}

export default SideBar