// Initialize express app
import express from 'express';
import bodyParser from 'body-parser';
import { find, findById, insert, update, remove } from './users/model.js';
const app = express();
app.use(bodyParser.json());

// GET ALL USERS
app.get('/api/users', async (req, res) => {
  const alluser = await find();
  res.json(alluser);
});
// GET USER BY ID
app.get('/api/users/:id', async (req, res) => {
  const users = await findById(req.params.id);
  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ messege: 'ma jiro userkaasu' });
  }
});
// CREATE A NEW USER
app.post('/api/users', async (req, res) => {
  const newUser = await insert(req.body);
  if (newUser) {
    res.json(newUser);
  } else {
    res.status(404).json({ messege: 'lama samayn userkaas' });
  }
});
// UPDATE A USER
app.put('api/users/update/:id', async (req, res) => {
  const updatedUser = await update(req.params, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ messege: 'lama updategarayn ' });
  }
});
// DELETE A USER
app.delete('/api/users/delete/:id', async (req, res) => {
  const deletedUser = await remove(req.params.id);
  if (deletedUser) {
    res.json({
      status: 200,
      messege: `user whith id ${req.params.id} deleted successfully`,
    });
  } else {
    res.status(404).json({ messege: 'User was not deleted ' });
  }
});
// export default app
export default app;
