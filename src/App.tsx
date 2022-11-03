import React from 'react';

import { getRentData, createRentData, updateRentData, deleteRentData } from './lib/api';
import { IRentData } from './types/rent';
import RentTable from './components/RentTable';
import RentItem from './components/RentItem';
import RentChart from './components/RentChart';
import { sortDataByYear } from './lib/utils';

function App() {
  const [data, setData] = React.useState<IRentData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [editing, setEditing] = React.useState<boolean>(false);
  const [editingId, setEditingId] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [effectiveRent, setEffectiveRent] = React.useState<string>("");
  const [startingRent, setStartingRent] = React.useState<string>("");

  // create function that sorts data by year and sets state
  const sortAndSetData = (unsortedData: IRentData[]): void => setData(sortDataByYear(unsortedData));

  // load initial data from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getRentData();
      sortAndSetData(data);
      setLoading(false);
    };
    fetchData();
  }, []);


  // this function will set the Item component to edit mode
  const handleEdit = (id: string) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditing(true);
      setEditingId(id);
      setYear(itemToEdit.year.toString());
      setEffectiveRent(itemToEdit.effectiveRent.toString());
      setStartingRent(itemToEdit.startingRent.toString());
    }
  };

  // call api to create new item and update state with new data
  const handleCreate = async () => {
    if (year && effectiveRent && startingRent) {
      setLoading(true);
      const newItem = await createRentData({
        year: parseInt(year),
        effectiveRent: parseInt(effectiveRent),
        startingRent: parseInt(startingRent),
      });
      setLoading(false);
      sortAndSetData([...data, newItem]);
      setYear("");
      setEffectiveRent("");
      setStartingRent("");
    }
  };

  // call api to update data and update state
  const handleUpdate = async (dataToUpdate: IRentData) => {
    setLoading(true);
    const updatedData = await updateRentData(dataToUpdate);
    setLoading(false);
    const updatedDataArray = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    sortAndSetData(updatedDataArray);
  };


  // call api to delete data and update state
  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteRentData(id);
    setLoading(false);
    const updatedData = data.filter((item) => item.id !== id);
    sortAndSetData(updatedData);
  };

  // after the user clicks the "Update"/"Create" button, we want to reset the form
  const clearForm = () => {
    setEditing(false);
    setEditingId("");
    setYear("");
    setEffectiveRent("");
    setStartingRent("");
  };

  // this function is called when the user clicks the "Update"/"Create" button
  // if the user is editing an existing item, we call handleUpdate
  // if the user is creating a new item, we call handleCreate
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editing) {
      handleUpdate({
        id: editingId,
        year: parseInt(year || "0"),
        effectiveRent: parseInt(effectiveRent || "0"),
        startingRent: parseInt(startingRent || "0"),
      });
    } else {
      handleCreate();
    }
    clearForm();
  };

  return (
    <div className="App">
      <RentItem
        year={year}
        effectiveRent={effectiveRent}
        startingRent={startingRent}
        setYear={setYear}
        setEffectiveRent={setEffectiveRent}
        setStartingRent={setStartingRent}
        handleSubmit={handleSubmit}
        editing={editing}
        clearForm={clearForm}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <RentTable data={data} handleDelete={handleDelete} handleEdit={handleEdit} />
          <RentChart data={data} />
        </div>
      )}
    </div>
  );
}



export default App;
