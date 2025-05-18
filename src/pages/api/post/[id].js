import { posts } from './index.js'; // Importa os posts do arquivo 'index.js'

export default function handler(req, res) {
  const { id } = req.query;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(posts[postIndex]);
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    posts[postIndex] = { ...posts[postIndex], title, content };
    return res.status(200).json(posts[postIndex]);
  }

  if (req.method === 'DELETE') {
   // const id = parseInt(query.id); // Converte o ID da query para número
    const id = req.body;
    const idreq = parseInt(id);
    const index = posts.findIndex((p) => p.id === idreq); // Procura o post com o ID

    if (index !== -1) {
        posts.splice(index, 1); // Remove o post da lista
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } else {
        res.status(404).json({ message: 'Post não encontrado' });
    }
  }
}
