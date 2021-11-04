import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector(state => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector(state => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, successDelete]);

	const deleteHandler = id => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<div>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message Message variant="danger">
					{error}
				</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.isAdmin ? (
										<i className="fa fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fa fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fa fa-edit" aria-hidden="true">
												Edit
											</i>
										</Button>
									</LinkContainer>
									<Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
										<i className="fa fa-trash" aria-hidden="true"></i>
									</Button>
								</td>
								<td>test</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UserListScreen;
