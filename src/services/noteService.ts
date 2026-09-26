import axios from "axios";
import type {Note, newNotes} from "../types/note"


const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}


export const fetchNotes = async( page:number, search?:string) => {
    const res = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", {
        params: {
            search: search,
            page: page,
            perPage: 12,
        }, headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    },
    )
    return res.data;
}

export const createNote = async(newNotes:newNotes) => {
    const res = await axios.post<Note>("https://notehub-public.goit.study/api/notes", newNotes, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return res.data
}

export const deleteNote = async(id:string):Promise<Note[]> => {
    const res = await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return res.data
}