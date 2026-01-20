import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function TaskList() {
  const { taskListId } = useParams;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task_list/${taskListId}/task`,
        );

        setData(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
      }
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Tanggal Deadline</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
