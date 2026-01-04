import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/index/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/index/$id"!</div>
}
