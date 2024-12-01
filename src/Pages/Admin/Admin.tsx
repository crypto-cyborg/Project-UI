import { useEffect, useState } from 'react';
import './Admin.scss';
import { useAdmin } from '../../Store/Hooks/useAdminHook';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/Reducers/store';
import foto from '../../Assets/Images/Profile.jpg';
import { setShowDeletePopOp } from '../../Store/Reducers/adminSlice';
import Loader from '../../Components/Loading/Loader';
import animationData from "../../Assets/Videos/BtnLoading.json";

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>();
  const adminState = useSelector((state: RootState) => state.admin);
  const { GetAllUsers, DeleteUser, Resize, PageChange } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(adminState.Users || []);

  useEffect(() => {
    if (adminState.Users === null) {
      GetAllUsers();
    }
  }, []);

  useEffect(() => {
    Resize();
    window.addEventListener('resize', Resize);

    return () => window.removeEventListener('resize', Resize);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = (adminState.Users || []).filter((user) =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(adminState.Users || []);
    }
  }, [searchTerm, adminState.Users]);

  const totalPages = Math.ceil(filteredUsers.length / adminState.usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (adminState.currentPage - 1) * adminState.usersPerPage,
    adminState.currentPage * adminState.usersPerPage
  );

  return (
    <Loader isLoading={adminState.isLoading} animationData={animationData}>
      <div className="admin">
        <div className="header">
          <h1>Users</h1>
          <div className="header-right">
            <input
              type="search"
              name="search"
              placeholder="Search (e.g. Elnur_0)"
              className="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="users">
          {displayedUsers.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-card-content">
                <div className="user-card-left">
                  <img src={foto} className="user-image" alt="User" />
                </div>

                <div className="user-card-right">
                  <h2>{user.FirstName} {user.LastName}</h2>
                  <p className="username">@{user.Username}</p>
                </div>
              </div>

              <div className="user-card-footer">
                <div className="user-info">
                  <p className="email">Email: {user.Email}</p>
                  <p className="role">{user.Role}</p>
                  <p className={`email-status ${user.IsEmailConfirmed ? 'confirmed' : 'not-confirmed'}`}>
                    {user.IsEmailConfirmed ? "Email Confirmed" : "Email Not Confirmed"}
                  </p>
                </div>
                <div className="edit-btn-container">
                  <button className="btn" onClick={() => dispatch(setShowDeletePopOp({ visibility: !adminState.showDeletePopOp, userId: user.Id }))}><i className='bx bx-trash-alt' ></i></button>
                  <button className="btn"><i className='bx bx-edit-alt'></i></button>
                </div>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn prev"
                onClick={() => PageChange(adminState.currentPage - 1, totalPages)}
                disabled={adminState.currentPage === 1}
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`page-btn ${adminState.currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => PageChange(i + 1, totalPages)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn next"
                onClick={() => PageChange(adminState.currentPage + 1, totalPages)}
                disabled={adminState.currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>

        {adminState.showDeletePopOp && (
          <div className="delete-popup">
            <div className="popup-content">
              <h3>Are you sure you want to delete this user?</h3>
              <div className="popup-buttons">
                <button className="confirm-btn" onClick={() => DeleteUser(adminState.userId)}>Yes, Delete</button>
                <button className="cancel-btn" onClick={() => dispatch(setShowDeletePopOp({ visibility: !adminState.showDeletePopOp, userId: '' }))}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Loader>
  );
}