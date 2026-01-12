import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios/api";

export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NoteFilter {
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

export const useGetNotes = (filters: NoteFilter) => {
  return useQuery<Note[], Error>({
    queryKey: ["notes", filters],
    queryFn: async () => {
      const res = await api.get<Note[]>("/notes", {
        params: {
          ...filters,
          tags: filters.tags?.join(","), // backend-friendly
        },
      });
      return res.data;
    },
  });
};

type CreateNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, CreateNoteInput>({
    mutationFn: async (noteData) => {
      const res = await api.post<Note>("/notes", noteData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

type UpdateNoteInput = {
  id: number;
  noteData: Partial<Pick<Note, "title" | "content" | "tags">>;
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, UpdateNoteInput>({
    mutationFn: async ({ id, noteData }) => {
      const res = await api.put<Note>(`/notes/${id}`, noteData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useGetNoteById = (id?: number) => {
  return useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await api.get<Note>(`/notes/${id}`);
      return res.data;
    },
    enabled: Boolean(id), // 🔥 VERY IMPORTANT
  });
};
