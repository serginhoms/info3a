//simulador banco local;
export let posts = [
{
  "id":"2",
  "title":"aaaa",
  "content":"zzzzzzz"
},
{
  "id":"3",
  "title":"aaaa",
  "content":"zzzzzzz"
},
{
  "id":"4",
  "title":"aaaa",
  "content":"zzzzzzz"
}]

export let idCounter = 1; // Aqui mantemos o contador de IDs
let title;
let content;
const newPost = { id: idCounter++, title, content };


export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(posts); // Retorna todos os posts
  } else if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPost = { id: idCounter++, title, content }; // Cria um novo post
    posts.push(newPost); // Adiciona o post à lista
    res.status(201).json(newPost); // Responde com o novo post
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
