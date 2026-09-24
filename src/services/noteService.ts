import axios from "axios";
import type {Note, newNotes} from "../types/note"


const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}


export const fetchNotes = async(query:string, page:number) => {
    const res = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api", {
        params: {
            query: query,
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
    const res = await axios.post<Note>("https://notehub-public.goit.study/api", newNotes)
    return res.data
}

export const deleteNote = async(id:number):Promise<Note[]> => {
    const res = await axios.get(`https://notehub-public.goit.study/api/${id}`)
    return res.data
}