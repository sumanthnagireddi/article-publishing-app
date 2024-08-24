import Search from "./Search";

function Navbar() {
  return (
    <nav className="w-full h-[65px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="font-medium text-emerald-600 text-lg">Online Pubishing Platform</h2>
      <Search/>
      <img className="h-10 w-10 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    </nav>
  );
}

export default Navbar;
