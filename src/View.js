import React, { useEffect, useState } from "react";
import Create from "./Create";

const View = () => {
	const [show, setShow] = useState(false);
	const [users, setUsers] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [familyName, setFamilyName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [id, setId] = useState("");
	useEffect(() => {
		fetch("http://localhost:3200/user")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setUsers(data);
				console.log(users);
			})
			.catch((err) => console.log(err));

		return () => {};
    }, []);

    const handleSearch = (filter, filterBy='firstName') => {
        fetch(`http://localhost:3200/user?filter=${filter}&filterBy=${filterBy}`)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						console.log(data);
						setUsers(data);
						console.log(users);
					})
					.catch((err) => console.log(err));
    }
    
    const handleSort = (sortBy, sort='asc') => {
        fetch(`http://localhost:3200/user?sortBy=${sortBy}&sort=${sort}`)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						console.log(data);
						setUsers(data);
						console.log(users);
					})
					.catch((err) => console.log(err));
    }

	const handleUpdate = () => {
		const body = {
			firstName: firstName,
			lastName: familyName,
			email,
			dateOfBirth: birthDate,
			bio,
		};
		// const res = await axios.post("http://localhost:3200/user", JSON.stringify(body), {
		//     headers: {
		//         'content-type': 'application/json'
		//     }
		// });
		console.log(body);
		fetch(`http://localhost:3200/user/${id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3200/user/${id}`, {
			method: "DELETE",
			
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<section id="lastpage">
				<div id="search_and_sort">
					<input
						type="text"
						id="search"
						placeholder="Search for Firstname..."
                        title="Type in a name"
                        onChange={(e)=>handleSearch(e.target.value)}
                    />
					<h1>Sort By </h1>
					<button id="last_lname_button" onClick={() => handleSort("lastName")}>
						Lastname
					</button>
					<button id="last_dob_button" onClick={() => handleSort("lastName")}>
						DOB
					</button>
				</div>
				<div class="row">
					<div class="column">
						<table>
							<tr>
								<th style={{ paddingLeft: 2 }}>id</th>
								<th style={{ paddingLeft: 10 }}>Firstname</th>
								<th style={({ paddingLeft: 30 }, { paddingRight: 20 })}>
									Lastname
								</th>
								<th style={({ paddingLeft: 30 }, { paddingRight: 20 })}>Dob</th>
								<th style={{ paddingRight: 20 }}>Email</th>
								<th style={{ paddingRight: 10 }}>Bio</th>
								<th
									colSpan="2"
									style={({ paddingLeft: 20 }, { paddingRight: 20 })}>
									Actions
								</th>
							</tr>

							{users.map((user, index) => (
								<tr key={index}>
									<th style={{ paddingLeft: 2 }}>{index + 1}</th>
									<th style={{ paddingLeft: 10 }}>{user.firstName}</th>
									<th style={({ paddingLeft: 30 }, { paddingRight: 20 })}>
										{user.lastName}
									</th>
									<th style={({ paddingLeft: 30 }, { paddingRight: 20 })}>
										{user.dateOfBirth}
									</th>
									<th style={{ paddingRight: 20 }}>{user.email}</th>
									<th style={{ paddingRight: 10 }}>{user.bio} </th>
									<th
										colSpan="2"
										style={({ paddingLeft: 20 }, { paddingRight: 20 })}>
										<button
											id="update"
											onClick={() => {
												setShow(true);
												setFirstName(user.firstName);
												setFamilyName(user.lastName);
												setBio(user.bio);
												setBirthDate(user.dateOfBirth);
												setEmail(user.email);
												setId(user._id);
											}}>
											Update
										</button>
										<button
											id="delete"
											onClick={() => {
												handleDelete(user._id);
											}}>
											Delete
										</button>
									</th>
								</tr>
							))}
						</table>
					</div>
				</div>
				{show && (
					<div>
						<div id="formfield">
							<label>
								First Name <br />
								<input
									type="text"
									name="firstname"
									placeholder="Enter Your First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</label>
							<br />

							<label>
								Family Name <br />
								<input
									type="text"
									name="familyname"
									placeholder="Enter Your Family name"
									value={familyName}
									onChange={(e) => setFamilyName(e.target.value)}
								/>
							</label>
							<br />

							<label>
								Birth Date
								<br />
								<input
									type="text"
									name="birthdate"
									value={birthDate}
									onChange={(e) => setBirthDate(e.target.value)}
									placeholder="Enter Your Birthdate"
								/>
							</label>
							<br />

							<label>
								Email
								<br />
								<input
									type="text"
									name="email"
									placeholder="Enter Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</label>
							<br />

							<label>
								Bio
								<br />
								<textarea
									value={bio}
									placeholder="Write Something Here.."
									onChange={(e) => setBio(e.target.value)}
								/>
							</label>
							<br />

							<button onClick={handleUpdate}>Submit</button>
						</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default View;
