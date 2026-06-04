import mysql from "mysql2/promise";

const connect= mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'VRS'
});

const testConnection = async () => {
    try {
        const connection  = await connect.getConnection();
        console.log("Connected successfully");
        connection.release();
    } catch (err) {
        console.error(err);
    }
}

testConnection();

export default connect;

