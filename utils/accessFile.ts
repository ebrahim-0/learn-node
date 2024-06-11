import { Response } from "express";
import { promises as fsPromises } from "fs";

const accessFile = async (dbPath: string, res: Response) => {
  try {
    await fsPromises.access(dbPath).catch((err) => {
      console.error("accessError: ", err);
      return res.status(500).json({ message: "Database not found" });
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export default accessFile;
