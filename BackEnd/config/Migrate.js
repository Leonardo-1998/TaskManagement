const pool = require("./Config");

console.log("===== Migrate =====");

const migrate = async () => {
  try {
    // ===== Drop Table =====
    const queryDropTable = `
        DROP TABLE IF EXISTS "Users", "Task_Lists", "Tasks", "Collaborators"
    `;

    const { rows: dropTable } = await pool.query(queryDropTable);

    if (dropTable) {
      console.log("Berhasil melakukan drop table.");
    }
    // ===== ===== ===== =====

    //===== Create Users Table =====
    const queryCreateTableUsers = `
        CREATE TABLE IF NOT EXISTS "Users" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
        )
    `;

    const { rows: createTableUsers } = await pool.query(queryCreateTableUsers);

    if (createTableUsers) {
      console.log("Berhasil membuat table Users");
    }

    //===== ===== ===== =====

    //===== Create Table Task_Lists =====
    const queryCreateTableTaskLists = `
        CREATE TABLE IF NOT EXISTS "Task_Lists" (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        deskripsi VARCHAR(255) NULL,
        Position integer not NUll,
        is_deleted boolean NUll,
        user_id integer NOT  NULL ,
 	 	      FOREIGN KEY(user_id) 
          REFERENCES "Users"(id)
          ON DELETE CASCADE 
          ON UPDATE CASCADE
        )
    `;

    const { rows: createTableTaskLists } = await pool.query(
      queryCreateTableTaskLists,
    );

    if (createTableTaskLists) {
      console.log("Berhasil membuat table Task_Lists");
    }

    //===== ===== ===== =====

    //===== Create Tasks Table =====
    const queryCreateTableTasks = `
        CREATE TABLE IF NOT EXISTS "Tasks" (
        id SERIAL PRIMARY KEY,
        Judul VARCHAR(255) NOT NULL,
        Status VARCHAR(255) NOT NULL,
        Tanggal_Deadline VARCHAR(255) NULL,
        Position integer not NUll,
        is_deleted boolean NUll,
        task_list_id integer NOT  NULL ,
 	 	      FOREIGN KEY(task_list_id) 
          REFERENCES "Task_Lists"(id)
          ON DELETE CASCADE 
          ON UPDATE CASCADE
        )
    `;

    const { rows: createTableTasks } = await pool.query(queryCreateTableTasks);

    if (createTableTasks) {
      console.log("Berhasil membuat table Tasks");
    }

    //===== ===== ===== =====

    //===== Create Collaborators Table =====
    const queryCreateTableCollaborators = `
        CREATE TABLE IF NOT EXISTS "Collaborators" (
        id SERIAL PRIMARY KEY,
        task_list_id integer NOT  NULL ,
 	 	      FOREIGN KEY(task_list_id) 
          REFERENCES "Task_Lists"(id)
          ON DELETE CASCADE 
          ON UPDATE CASCADE,
        user_id integer NOT  NULL ,
 	 	      FOREIGN KEY(user_id) 
          REFERENCES "Users"(id)
          ON DELETE CASCADE 
          ON UPDATE CASCADE
        )
    `;

    const { rows: createTableCollaborators } = await pool.query(
      queryCreateTableCollaborators,
    );

    if (createTableCollaborators) {
      console.log("Berhasil membuat table Collaborators");
    }

    //===== ===== ===== =====
  } catch (error) {
    console.log("===== Error =====");
    console.log("Terjadi Error pada saat migrating.");
  }
};

migrate();
