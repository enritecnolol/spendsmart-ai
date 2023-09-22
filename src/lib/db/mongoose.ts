import { connect } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) {
    return;
  }
  try {
    const db = await connect(process.env.MONGODB_URI!);
    conn.isConnected = !!db.connections[0].readyState;  
  } catch (error) {
    console.log(error)
  }
}
