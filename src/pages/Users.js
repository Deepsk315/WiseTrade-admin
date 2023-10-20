import React, { useState, useEffect } from "react";
import Pagination from '../components/Pagination'
import { url } from '../actions/config'
import ModalImage from "react-modal-image";
import axios from 'axios'
// import "react-modal-image/css/modal-image.css";


export default function Users() {

  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getUsers = () => {
    setIsLoading(true)
    axios.get(url() + 'users/allUsers', {
      skip: skip,
      limit: limit
    }).then(response => {
      if (response?.status == 200) {
        console.log('res.data : ', response?.data)
        setUsers(response?.data)
        // if (response?.data?.total) setTotal(response?.data?.total)
        setTotal(response?.data?.length)
        setIsLoading(false)
      }
    }).catch(error => {
      console.error(error);
      setError(error?.response?.data?.msg)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getUsers()
  }, [skip])

  return (
    <div className="card bg-light m-5">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-3">
          <h5 className="ml-2">Users</h5>
          <Pagination total={total} limit={limit} setSkip={setSkip} users={users} />
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Addres</th>
                <th scope="col">Aadhar front</th>
                <th scope="col">Aadhar back</th>
                <th scope="col">PAN</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <div className="row my-4 mt-2">
                  <div className="m-auto spinner-border text-info"></div>
                </div>
              )}
              {!loading && users.map((user) => {
                return (
                  <tr key={user?._id}>
                    <td>
                      {user._id}
                    </td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.address}</td>

                    <td>
                      <ModalImage
                        small={user?.aadhar_front}
                        large={user?.aadhar_front}
                        alt="Aadhar Front"
                        hideDownload={true}
                        hideZoom={true}
                        visible={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className="custom-modal-image"
                      />

                    </td>
                    <td>
                      <ModalImage
                        small={user?.aadhar_back}
                        large={user?.aadhar_back}
                        alt="Aadhar Back"
                        hideDownload={true}
                        hideZoom={true}
                        visible={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className="custom-modal-image"
                      />
                    </td>
                    <td>
                      <ModalImage
                        small={user?.pan_pic}
                        large={user?.pan_pic}
                        alt="Pan"
                        hideDownload={true}
                        hideZoom={true}
                        visible={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className="custom-modal-image"
                      />

                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );

}
