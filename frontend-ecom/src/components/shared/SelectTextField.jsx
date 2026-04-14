const SelectTextField = ({ label, select, setSelect, lists = [] }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold text-sm text-slate-800">{label}</label>
      <select
        value={select?.categoryId || ''}
        onChange={(e) => {
          const found = lists.find(
            (item) => String(item.categoryId) === e.target.value
          );
          if (found) setSelect(found);
        }}
        className="px-4 py-2 border border-slate-700 outline-hidden bg-transparent text-slate-800 rounded-md"
      >
        {(lists || []).map((item) => (
          <option key={item.categoryId} value={item.categoryId}>
            {item.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTextField;
