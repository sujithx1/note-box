import { createFileRoute } from '@tanstack/react-router'
import NoteDetail from '../components/Detail.page';

export const Route = createFileRoute('/index/$id')({
  component: NoteDetailRoute,
})

function NoteDetailRoute() {

  const {id}= Route.useParams();
  return <NoteDetail noteId={id} />;
}
