import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios/api";


export interface Notes{
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NoteFilter{
  search?:string;
  tags?:string[];
  page?: number;
  limit?: number;

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


}

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const createNote = async (noteData: { title: string; content: string }) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  }; 

  return useMutation( 
    {mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  }); 
}

export const useUpdateNote = () => {
const queryClient = useQueryClient();

  const updateNote = async ({id, noteData}: {id:number, noteData: { title?: string; content?: string }}) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  };
  
  return useMutation(
    {mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

}


export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  const deleteNote = async (id: number) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  };

  return useMutation(
    {mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}



export const useGetNoteById = (id: number) => {

  const fetchNoteById = async () => {
    const res= await api.get(`/notes/${id}`);
    return res.data;
  };  

  return useQuery({
    queryKey: ['note', id],
    queryFn: fetchNoteById,
  })
} 