const { addNote, removeNote, listNotes, readNote, updateNote } = require('./command');

const [, , command, ...args] = process.argv;

switch (command) {
    case 'add': {
        const title = args[0];
        const body = args.slice(1).join(' ');
        if (!title || !body) {
            console.log('Usage: add <title> <body>');
        } else {
            addNote(title, body);
        }
        break;
    }

    case 'remove': {
        const title = args[0];
        if (!title) {
            console.log('Usage: remove <title>');
        } else {
            removeNote(title);
        }
        break;
    }

    case 'list': {
        listNotes();
        break;
    }

    case 'read': {
        const title = args[0];
        if (!title) {
            console.log('Usage: read <title>');
        } else {
            readNote(title);
        }
        break;
    }

    case 'update': {
        const title = args[0];
        const newBody = args.slice(1).join(' ');
        if (!title || !newBody) {
            console.log('Usage: update <title> <new body>');
        } else {
            updateNote(title, newBody);
        }
        break;
    }

    default:
        console.log('Unknown command. Use: add | remove | list | read');
}
