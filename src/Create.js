import React, { useState } from "react";
import axios from "axios";

const Create = () => {
	const [firstName, setFirstName] = useState("");
	const [familyName, setFamilyName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");

	const handleSubmit = () => {
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
		fetch("http://localhost:3200/user", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
			body: JSON.stringify(body),
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	return (
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

					<button onClick={handleSubmit}>Submit</button>
				</div>
		</div>
	);
};

export default Create;
