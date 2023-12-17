import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";
import useExcelReader from '../../hooks/excel.hook';
import { useDispatch } from 'react-redux';
import { setExcelFileData } from '../../redux/slices/file';
import Table from '../../components/table/table';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { handleExcelReadToJson, jsonData, removeJSONData } = useExcelReader();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const tableRef = useRef();

  const draggingOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }
  const draggingLeave = () => {
    setIsDragging(false);
  }

  const onDrop = (e) => {
    if (!isFileUploaded) {
      e.preventDefault();
      draggingLeave();

      const selectedFile = e?.dataTransfer?.files[0];

      const namie = selectedFile.name.split('.');
      const extension = namie[namie.length - 1];

      if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && extension !== 'xlsx') {
        toast.error("Kindly upload only Excel Files with extension .xlsx")
        return;
      }
      setIsFileUploaded(true);
      setFile(selectedFile);
    } else {
      toast.error("File Already uploaded.");
    }
  }
  const handleFileOnUpdate = (e) => {
    if (e.target.files && !e.target.files.length) {
      toast.error("No File Found")
      return;
    }
    const selectedFile = e?.target.files[0];

    const namie = selectedFile.name.split('.');
    const extension = namie[namie.length - 1];

    if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && extension !== 'xlsx') {
      toast.error("Kindly upload only Excel Files with extension .xlsx")
      return;
    }
    setIsFileUploaded(true);
    setFile(selectedFile);
  }

  const resetAll = () => {
    removeJSONData();
    setFile(null);
    setIsFileUploaded(false);
    tableRef.current.resetData();
    dispatch(
      setExcelFileData({
        data: null
      })
    )
  }

  const loadFile = () => {
    if (file) {
      handleExcelReadToJson(file);
    } else {
      toast.error("No File Found!");
    }
  }

  useEffect(() => {
    if (jsonData && jsonData.length) {
      dispatch(
        setExcelFileData({
          data: jsonData
        })
      )
    }
  }, [jsonData])

  return (
    <div className='w-full'>
      <div className='text-3xl font-semibold tracking-widest '>
        <span className='text-6xl font-extrabold text-[#0a549b]'>D</span>ashboard
      </div>

      <div className='flex items-center gap-3 mt-5'>

        <div className='flex flex-col gap-3 w-full'>
          <div className='font-bold text-lg italic'>Google Sheet URL/ID:</div>
          <input type="text" className='w-full shadow-inner bg-[#eaeaea] text-xl outline-none py-3 px-3 rounded disabled:cursor-not-allowed' disabled={isFileUploaded} />
        </div>
        <div className='text-6xl uppercase font-extrabold italic'>or</div>
        <input id="fileDropExcelId-321pilay" type="file" onChange={handleFileOnUpdate} className='hidden' disabled={isFileUploaded} />
        <div
          onDragOver={draggingOver}
          onDragLeave={draggingLeave}
          onDrop={onDrop}
          onClick={() => { document.getElementById('fileDropExcelId-321pilay').click() }}
          className={`h-full min-h-max w-full border-2 border-dashed ${isDragging ? 'border-green-500 text-green-500' : 'border-[#0a549b] text-[#0a549b]'} p-6 cursor-pointer flex justify-center items-center`}
        >
          <div className='font-bold text-xl p-2'>
            {!file ? (
              <>Select or Drop File ... </>
            ) : (<div className='flex gap-3 items-center'>
              {file.name}
            </div>)}
          </div>
        </div>
      </div>

      <div className='w-full flex justify-end items-center gap-3 mt-3'>
        <button className='bg-red-500 text-white px-5 py-3 rounded font-bold disabled:bg-red-100 disabled:cursor-not-allowed' disabled={!isFileUploaded} onClick={resetAll}>
          Clear File
        </button>
        <button className='bg-[#0a549b] text-white px-5 py-3 rounded font-bold disabled:bg-gray-400 disabled:cursor-not-allowed' disabled={!isFileUploaded} onClick={loadFile}>
          Load File
        </button>
      </div>

      <div className='w-full mt-6'>
        <Table ref={tableRef} />
      </div>

    </div>
  )
}

export default Dashboard;
