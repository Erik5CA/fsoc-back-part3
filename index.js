const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
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

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end();
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end();
  }
  persons = persons.filter((person) => person.id !== id);

  response.json(person);
});

const generateId = () => {
  const id = Math.floor(Math.random() * 5000);
  return id;
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({ error: "missing data" });
  }
  const personFound = persons.find((person) => person.name === name);
  if (personFound) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const person = {
    name,
    number,
    id: generateId(),
  };
  persons = [...persons, person];
  response.json(person);
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
