const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

export async function GET(request, { params }) {
    const id = params.id;
    const safeValues = [id];
    let status;
    const data = await pool
        .query("SELECT * FROM contacts WHERE id=$1;", safeValues)
        .then(({ rowCount, rows }) => {
            // rowCount from the database response
            if (rowCount === 0) {
                status = 404;
                return {
                    message: `Contact with id ${id} Not Found`,
                };
            } else {
                status = 200;
                return rows[0];
            }
        })
        .catch((e) => {
            status = 500;
            return { message: e.message };
        });

    return new Response(JSON.stringify(data), { status });
}

export async function PUT(request, { params }) {
    const id = params.id;
    const req = await request.json();

    const { name, email, phone_number, address } = req;
    const safeValues = [name, email, phone_number, address, id];

    let status;
    const data = await pool
        .query(
            "UPDATE contacts SET name = $1,email=$2,phone_number=$3, address=$4 WHERE id=$5 RETURNING *;",
            safeValues
        )
        .then(({ rows }) => {
            status = 200;
            return rows[0];
        })
        .catch((e) => {
            status = 500;
            return { message: e.message };
        });

    return new Response(JSON.stringify(data), { status });
}

export async function DELETE(request, { params }) {
    const id = params.id;
    const safeValues = [id];
    let status;
    const data = await pool
        .query("DELETE FROM contacts WHERE id=$1 RETURNING *;", safeValues)
        .then(({ rows }) => {
            status = 200;
            return rows[0];
        })
        .catch((e) => {
            status = 500;
            return { message: e.message };
        });

    return new Response(JSON.stringify(data), { status });
}
