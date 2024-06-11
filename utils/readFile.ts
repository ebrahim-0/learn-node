import { Response } from "express";
import { promises as fsPromises } from "fs";

const readFile = async (dbPath: string, res: Response) => {
  try {
    await fsPromises.access(dbPath).catch((err) => {
      console.error("accessError: ", err);
      return res.status(500).json({ message: "Database not found" });
    });

    const data = await fsPromises.readFile(dbPath, "utf-8");

    const parseData = JSON.parse(data);

    return parseData;
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export default readFile;
