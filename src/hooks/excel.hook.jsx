import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const useExcelReader = () => {
    const [jsonData, setJsonData] = useState(null);

    const handleExcelReadToJson = (file) => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
              const data = event.target.result;
              const workbook = XLSX.read(data, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
              setJsonData(jsonData);
            };
      
            reader.readAsBinaryString(file);
        } else {
            return []
        }
    };

    const removeJSONData = () => {
        setJsonData(null)
    }

    return {
        handleExcelReadToJson,
        removeJSONData,
        jsonData
    }
}

export default useExcelReader
