import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'
import axios from 'axios'

const DataTable = ({ columns }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // Fetch data from API
        axios.get(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }} className='table table-bordered text-center'>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default DataTable