import { createFileRoute } from '@tanstack/react-router'
import Listes from '../components/listes'

export const Route = createFileRoute('/')({
  component: Listes,
})

