const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

const generatePersonId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = +request.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = +request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateHTML = function () {
  const entries = `<p>Phonebook has info for ${
    persons.length + 1
  }, \n ${new Date()}</p>`;
  return entries;
};
app.get("/info", (request, response) => {
  response.send(generateHTML());
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((per) => per.id === id);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((per) => per.id !== id);
  console.log(persons);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "content missing" });
  } else if (persons.map((per) => per.name).includes(body.name)) {
    return response.status(400).json({ error: "Name must be unique" });
  } else if (persons.map((per) => per.number).includes(body.number)) {
    return response.status(400).json({ error: "Number must be unique" });
  }
  const person = {
    id: generatePersonId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  console.log(persons);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
