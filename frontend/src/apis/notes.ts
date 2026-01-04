import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios/api";


export interface Notes{
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFilter{
  search?:string;
  tags?:string[];
  page?: number;
  limit?: number;

}


export const useCreateNote = () => {
  // Implementation for creating a note
  const quearyClient = useQueryClient();

const createNote = async (noteData: { title: string; content: string }) => {
  const response = await api.post('/notes', noteData);
  return response.data;
}; 

return useMutation( 

  {mutationFn: createNote,
  onSuccess: () => {
    quearyClient.invalidateQueries(['notes']);
  },
}); 


}

export const useGetNotes = ({limit, page, search, tags}:NoteFilter) => {

  const fetchNotes = async () => {
    const res= await api.get('/notes', {
      params: {
        limit,
        page,
        search,
        tags: tags?.join(','),
      },
    });
    return res.data;
  };


  return useQuery({
    queryKey: ['notes', { limit, page, search, tags }],
    queryFn: fetchNotes,
  })

  // Implementation for fetching notes
}

export const useUpdateNote = () => {
  // Implementation for updating a note
}

export const useDeleteNote = () => {
  // Implementation for deleting a note
}