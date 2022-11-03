import style from './RentItem.module.css';

interface IRentItemProps {
    editing: boolean;
    year: string;
    effectiveRent: string;
    startingRent: string;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    setEffectiveRent: React.Dispatch<React.SetStateAction<string>>;
    setStartingRent: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    clearForm: () => void;
}

const RentItem: React.FC<IRentItemProps> = ({
    editing,
    year,
    effectiveRent,
    startingRent,
    setYear,
    setEffectiveRent,
    setStartingRent,
    handleSubmit,
    clearForm
}) => {
    const headingMode = editing ? 'Edit' : 'Add';
    const submitButtonMode = editing ? 'Update' : 'Create';

    return <form onSubmit={handleSubmit} className={style.item}>
        <h2>{headingMode} Rent Data</h2>
        <div className={style.inputContainer}>
            <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <input type="text" placeholder="Effective Rent" value={effectiveRent} onChange={(e) => setEffectiveRent(e.target.value)} />
            <input type="text" placeholder="Starting Rent" value={startingRent} onChange={(e) => setStartingRent(e.target.value)} />
        </div>
        <div className={style.buttonContainer}>
            {editing && <button type="button" onClick={clearForm}>Cancel Edit</button>}
            <button type="submit">{submitButtonMode}</button>
        </div>
    </form >
}


export default RentItem;
