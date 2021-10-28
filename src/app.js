const express = require('express');
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 80;
const filePath = 'list.json';

const app = express();
app.use(cors());
const jsonParser = express.json();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/list', async (req, res) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(content);
    console.log('list get all', list);
    res.send(list);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/list', jsonParser, function (req, res) {
  try {
    if (!req.body) return res.sendStatus(400);

    const userTodo = req.body.todo;
    let newTodo = { todo: userTodo, isComplite: false };
    let data = fs.readFileSync(filePath, 'utf8');
    let list = JSON.parse(data);

    const id = Math.max.apply(
      Math,
      list.map(function (o) {
        return o.id;
      })
    );

    if (id === -Infinity) {
      newTodo.id = 1;
    } else {
      newTodo.id = id + 1;
    }

    list.push(newTodo);
    data = JSON.stringify(list);
    fs.writeFileSync('list.json', data);
    console.log(`create new todo ${userTodo}`);
    res.send(newTodo);
  } catch (error) {
    console.log(error);
  }
});

app.put('/api/list', jsonParser, function (req, res) {
  try {
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const userIsComplite = req.body.isComplite;
    const userTodo = req.body.todo;
    console.log('edit', userId, userIsComplite, userTodo);

    let data = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(data);
    let todo;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == userId) {
        todo = list[i];
        break;
      }
    }

    if (todo) {
      todo.todo = userTodo;
      todo.isComplite = userIsComplite;
      data = JSON.stringify(list);
      fs.writeFileSync('list.json', data);
      res.send(list);
    } else {
      res.status(404).send(todo);
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/list/:id', function (req, res) {
  try {
    const id = req.params.id;
    let data = fs.readFileSync(filePath, 'utf8');
    let list = JSON.parse(data);
    let index = -1;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      const todo = list.splice(index, 1)[0];
      console.log('del', todo);
      data = JSON.stringify(list);
      fs.writeFileSync('list.json', data);
      res.send(list);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/alllist', jsonParser, function (req, res) {
  try {
    if (!req.body) return res.sendStatus(400);

    const userTodo = req.body.todo;

    data = JSON.stringify(userTodo);
    fs.writeFileSync('list.json', data);
    console.log(`create new todoS ALL`);
    res.send(userTodo);
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(`Server Error ${e}`);
    process.exit(1);
  }
};
start();
