export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notbox</h1>
        <button className="bg-black text-white px-4 py-2 rounded">
          New Note
        </button>
      </div>
    </header>
  )
}
