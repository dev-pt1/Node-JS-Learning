const fs = require('fs');
const file = 'notes.json';

function loadNotes() {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync(file, JSON.stringify(notes, null, 2));
}

function addNote(title, body) {
    const notes = loadNotes();
    const duplicate = notes.find(note => note.title === title);

    if (duplicate) {
        console.log('Note title already exists.');
        return;
    }

    notes.push({ title, body });
    saveNotes(notes);
    console.log('Note added!');
}

function removeNote(title) {
    const notes = loadNotes();
    const filtered = notes.filter(note => note.title !== title);

    if (filtered.length === notes.length) {
        console.log('Note not found.');
    } else {
        saveNotes(filtered);
        console.log('Note removed.');
    }
}

function listNotes() {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log('No notes found.');
        return;
    }

    console.log('Your Notes:');
    notes.forEach((note, i) => {
        console.log(`${i + 1}. ${note.title}`);
    });
}

function readNote(title) {
    const notes = loadNotes();
    const note = notes.find(n => n.title === title);

    if (!note) {
        console.log('Note not found.');
    } else {
        console.log(`${note.title}\n${note.body}`);
    }
}

function updateNote(title, newBody) {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title === title);

    if (index === -1) {
        console.log('Note not found.');
        return;
    }

    notes[index].body = newBody;
    saveNotes(notes);
    console.log('Note updated!');
}


module.exports = { addNote, removeNote, listNotes, readNote, updateNote };
