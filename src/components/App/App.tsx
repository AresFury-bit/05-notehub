import css from "./App.module.css";
import { keepPreviousData, useQuery, useMutation } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import type { OrderFormValue } from "../NoteForm/NoteForm";
import { useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  const handleButtonClick = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newNote: OrderFormValue) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmitForm = (values: OrderFormValue) => {
    console.log(values);
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    setIsModal(false);
  };
  const mutationDelite = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelite = (id: string) => {
    mutationDelite.mutate(id);
  };

  const handleChange = useDebouncedCallback((search: string) => {
    setSearch(search);
    console.log(search);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={(search: string) => handleChange(search)} />
        {data && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button onClick={handleButtonClick} className={css.button}>
          Create note +
        </button>
        {isLoading && <Loader />}
        {isModal && (
          <Modal
            onClose={closeModal}
            children={
              <NoteForm
                valuesForm={handleSubmitForm}
                onClose={() => setIsModal(false)}
              />
            }
          />
        )}
        {isError && <ErrorMessage />}
      </header>
      {data && <NoteList notes={data.notes} deleteNote={handleDelite} />}
    </div>
  );
}
