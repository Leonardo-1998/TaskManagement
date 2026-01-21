import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data berhasil dikirimkan");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        dataForm,
      );

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <h1>Register</h1>

      {error && (
        <>
          <p style={{ color: "red" }}>{error}</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password : </label>
              </td>
              <td>
                <input
                  type={hidden ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
