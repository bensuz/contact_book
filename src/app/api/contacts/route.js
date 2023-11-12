import { NextResponse } from "next/server";

const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

export async function GET(request) {
    let status;
    // Return data as a JSON response
    const data = await pool
        .query("SELECT * FROM contacts;")
        .then((data) => {
            status = 200;
            return data.rows;
        })
        .catch((e) => {
            status = 500;
            message: e.message;
        });

    return new Response(JSON.stringify(data), { status });
}

export async function POST(request) {
    const req = await request.json();

    const { name, email, phone_number, address } = req;
    const safeValues = [name, email, phone_number, address];

    let status;
    const data = await pool
        .query(
            "INSERT INTO contacts (name, email, phone_number, address) VALUES ($1,$2,$3, $4) RETURNING *;",
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
