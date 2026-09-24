import css from "./App.module.css"
import { useQuery } from "@tanstack/react-query"
import { fetchNotes } from "../../services/noteService"
import NoteList from "../NoteList/NoteList"
import Pagination from "../Pagination/Pagination"
import { useState } from "react"


export default function App() {

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    
    const { data, isLoading } = useQuery({
        queryKey: ["notes", query, page],
        queryFn: () => fetchNotes(query, page),
    })
    
    
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <button className={css.button}>Create note +</button>
                {data && <Pagination page={page} perPage={data?.totalPages} setPage={setPage}/>}
                {data && isLoading && <NoteList notes={data} /> }
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
</div>

    )
}