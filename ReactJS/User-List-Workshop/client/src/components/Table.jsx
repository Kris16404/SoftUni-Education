import { useEffect, useState } from 'react';

import * as userService from '../services/userService.js';
import * as searchService from '../services/searchService.js';
import UserTr from './UserTr.jsx';
import AddUserModal from './AddUserModal.jsx';
import UserInfoModal from './UserInfoModal.jsx';
import EditUserModal from './EditUserModal.jsx';
import DeleteUserModal from './DeleteUserModal.jsx';
import SearchBar from './SearchBar.jsx';
import Pagination from './Pagination.jsx';
import LoadingSpinner from './LoadingSpiner.jsx';

export default function Table() {
  let [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserInfoModal, setshowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({});
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);

  useEffect(() => {
    setIsLoading(true);
    userService.getAllUsers().then((result) => {
      setUsers(result);
      setIsLoading(false);
    });
  }, [showUserModal, showEditUserModal, showDeleteUserModal]);

  const onShowAddUserHandler = () => {
    setShowUserModal(true);
  };

  const onHideAddUserHandler = () => {
    setShowUserModal(false);
  };

  const onShowUserInfoHandler = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentElement.id;
    const user = await userService.getOneUser(id);
    setUserInfo(user);
    setshowUserInfoModal(true);
  };

  const onHideUserInfoHandler = () => {
    setshowUserInfoModal(false);
  };

  const onShowEditUserHandler = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentElement.id;
    const user = await userService.getOneUser(id);
    setEditUserInfo(user);
    setShowEditUserModal(true);
  };

  const onHideEditUserHandler = () => {
    setShowEditUserModal(false);
  };

  const onHideDeleteUserHandler = () => {
    setShowDeleteUserModal(false);
  };

  const onShowDeleteUserHandler = (e) => {
    const id = e.currentTarget.parentElement.id;
    setDeleteUserId(id);
    setShowDeleteUserModal(true);
  };

  const searchHandler = async (searchField, searchCriteria) => {
    const users = await searchService.searchByCriteria(
      searchField,
      searchCriteria
    );

    setUsers(users);
  };

  const deleteUserHandler = async (e) => {
    e.preventDefault();

    const data = await userService.deleteUser(deleteUserId);
    onHideDeleteUserHandler();
  };

  const onSortClickHandler = (e) => {
    console.log(users);
    users = users.sort((a, b) => {
      return a[e.currentTarget.id].localeCompare(b[e.currentTarget.id]);
    });
    console.log(users);
    currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  };

  return (
    <>
      <SearchBar searchHandler={searchHandler} />

      {showUserModal && <AddUserModal hideUserHandler={onHideAddUserHandler} />}

      {showUserInfoModal && (
        <UserInfoModal
          hideUserInfoModal={onHideUserInfoHandler}
          key={userInfo._id}
          _id={userInfo._id}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
          imageUrl={userInfo.imageUrl}
          phoneNumber={userInfo.phoneNumber}
          address={userInfo.address}
          createdAt={userInfo.createdAt}
          updatedAt={userInfo.updatedAt}
        />
      )}

      {showEditUserModal && (
        <EditUserModal
          hideEditUserHandler={onHideEditUserHandler}
          key={editUserInfo._id}
          _id={editUserInfo._id}
          firstName={editUserInfo.firstName}
          lastName={editUserInfo.lastName}
          email={editUserInfo.email}
          imageUrl={editUserInfo.imageUrl}
          phoneNumber={editUserInfo.phoneNumber}
          address={editUserInfo.address}
          createdAt={editUserInfo.createdAt}
          updatedAt={editUserInfo.updatedAt}
        />
      )}

      {showDeleteUserModal && (
        <DeleteUserModal
          hideDeleteModal={onHideDeleteUserHandler}
          deleteUserHandler={deleteUserHandler}
        />
      )}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th id="firstName" onClick={onSortClickHandler}>
                First name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th id="lastName" onClick={onSortClickHandler}>
                Last name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th id="email" onClick={onSortClickHandler}>
                Email
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th id="phoneNumber" onClick={onSortClickHandler}>
                Phone
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th id="createdAt" onClick={onSortClickHandler}>
                Created
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <LoadingSpinner />
                </td>
              </tr>
            ) : (
              currentRecords.map((user) => (
                <UserTr
                  key={user._id}
                  _id={user._id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  imageUrl={user.imageUrl}
                  phoneNumber={user.phoneNumber}
                  createdAt={user.createdAt}
                  hideUserInfoHandler={onHideUserInfoHandler}
                  showUserInfoHandler={onShowUserInfoHandler}
                  showEditUserHandler={onShowEditUserHandler}
                  showDeleteModal={onShowDeleteUserHandler}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* New user button   */}
      <button className="btn-add btn" onClick={onShowAddUserHandler}>
        Add new user
      </button>
      <Pagination
        recordsPerPage={recordsPerPage}
        setRecordsPerPage={setRecordsPerPage}
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
