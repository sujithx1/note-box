import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-4xl font-bold text-red-800">
      Welcome to NotBox! Your personal note-taking app.
    </h1>
    </div>
  )
}