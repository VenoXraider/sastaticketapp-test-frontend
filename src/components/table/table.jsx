import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useSelector } from 'react-redux';

const Table = forwardRef(({ }, ref) => {

    const excelData = useSelector((state) => state.excel.json)
    const [headers, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [time, setTime] = useState(10);
    const [isActive, setIsActive] = useState(false);


    useImperativeHandle(ref, () => ({
        resetData: () => {
            setHeader([]);
            setData([]);
            setTime(300);
            setIsActive(false);
        }
    }))

    useEffect(() => {
        if (excelData && excelData?.length) {
            let keys = Object.keys(excelData[0]);
            setHeader(keys);
            setData(excelData);
            setIsActive(true);
        }
    }, [excelData])

    const displayTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if(time === 0) {
            setIsActive(false);
            console.log("Send Email")
        }
    }, [time])

    return (
        <div className='w-full'>
            {isActive && (
                <div className='flex justify-end items-center mb-1'>
                    {displayTime()}
                </div>
            )}

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    {headers && headers.length ? (
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                {headers.map((e) => (
                                    <th scope="col" class="px-6 py-3">
                                        {e}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    ) : (<></>)}
                    {data && data.length ? (
                        <tbody>
                            {data.map((e) => {
                                return (
                                    <tr class="bg-white border-b hover:bg-gray-50 ">
                                        <th scope="row" class="px-6 py-4">
                                            {e?.Email}
                                        </th>
                                        <td class="px-6 py-4">
                                            {e?.Subject}
                                        </td>
                                        <td class="px-6 py-4">
                                            {e?.Body}
                                        </td>
                                        <td class="px-6 py-4">
                                            {e?.Status}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    ) : (<></>)}
                </table>
            </div>
        </div>
    )
});

export default Table
