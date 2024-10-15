import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';
const noncesPath = "../Sincero/server/api/benchmarks/loadingTimes.json"; 

export default defineEventHandler(async (event) => {
    // Read the request body
    const body = await readBody(event);
    console.log("this is the passed body of counter", body);

    const timestamp = body.timestamp;
    const apiLoadTime = body.apiLoadTime;
    const totalLoadTime = body.totalLoadTime;

    const newEntry = { timestamp, apiLoadTime, totalLoadTime };

    // Read the existing data from the JSON file
    let dataArray = [];
    try {
        const fileContents = await fs.readFile(noncesPath, 'utf-8');
        dataArray = fileContents ? JSON.parse(fileContents).data : [];
    } catch (error) {
        console.error("Error reading file:", error);
    }

    // Add the new entry to the data array
    dataArray.push(newEntry);

    // Write the updated data back to the JSON file
    const updatedData = { data: dataArray };
    await fs.writeFile(noncesPath, JSON.stringify(updatedData, null, 2));
  
    return{
      code: 200
    }
});
