import React from 'react';
import { IRentData } from '../../types/rent';
import styles from './RentTable.module.css';


interface ITableProps {
    data: IRentData[];
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
};


const RentTable: React.FC<ITableProps> = ({ data, handleDelete, handleEdit }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Effective Rent</th>
                    <th>Starting Rent</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.year}</td>
                        <td>{item.effectiveRent}</td>
                        <td>{item.startingRent}</td>
                        <td>
                            <button onClick={() => handleEdit(item.id)} title="Edit">📝</button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(item.id)} title="Delete">🗑</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RentTable;
