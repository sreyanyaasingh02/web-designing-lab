
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('myNotes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('myNotes', JSON.stringify(notes))
  }, [notes])

  function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('Please fill in both fields.')
      return
    }

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId
          ? { ...note, title, content }
          : note
      ))
      setEditId(null)
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content
      }
      setNotes([...notes, newNote])
    }

    setTitle('')
    setContent('')
  }

  function editNote(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note.id)
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id))

    if (editId === id) {
      setEditId(null)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="app">
      <header>
        <h1>My Notes</h1>
        <p>Write down your thoughts and ideas.</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        ></textarea>

        <button type="submit">
          {editId !== null ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <section className="notes-section">
        <h2>My Saved Notes</h2>

        {notes.length === 0 ? (
          <p className="empty">No notes yet. Add your first note!</p>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <div className="note-card" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <div className="note-actions">
                  <button onClick={() => editNote(note)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
