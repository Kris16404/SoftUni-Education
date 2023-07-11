import { html } from '../node_modules/lit-html/lit-html.js';
import { createBookFunc, deleteFunc, editBookFunc, editFunc } from './app.js';

const bookTemplate = (title, author, id) => html`
  <tr>
    <td>${title}</td>
    <td>${author}</td>
    <td id="${id}">
      <button @click="${editFunc}">Edit</button>
      <button @click="${deleteFunc}">Delete</button>
    </td>
  </tr>
`;

let homeView = html`
  <button id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." id="addTitle" />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." id="addAuthor" />
    <input type="submit" value="Submit" @click="${createBookFunc}" />
  </form>
  <form id="edit-form" style="display: none">
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." id="editTitle" />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." id="editAuthor" />
    <input type="submit" value="Save" @click="${editBookFunc}" />
  </form>
`;

export { homeView, bookTemplate };
