import { useState, type FC } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { add, deleteItem, setEditField } from "./redux/tableSlice"

const App: FC = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(({ table }) => table);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const editField = useAppSelector(({ table }) => table.editField)

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "cenetr",
    }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <button type="button" onClick={() => {
          dispatch(add({ name, surname, }));
          setName("");
          setSurname("");
        }}>Add</button>
      </div>
      <table border={1}>
        <thead>
          <th>N</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Action</th>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{editField?.id === item.id ? (
                <input type="text" value={editField.name} onChange={(e) => dispatch(setEditField({ ...item, name: e.target.value }))} />
              ) : (
                item.name
              )}</td>
              <td>{editField?.id === item.id ? (
                <input type="text" value={editField.surname} onChange={(e) => dispatch(setEditField({ ...item, surname: e.target.value }))} />
              ) : (
                item.surname
              )}</td>
              <td>
                {
                  editField?.id === item.id ? (
                    <div>
                      <button type="button" onClick={() => {

                        dispatch(setEditField(null));
                      }}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={() => {
                        dispatch(save(editField))
                        dispatch(setEditField(null));

                      }}>
                        Save
                      </button>
                    </div>

                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditField(item)}>Edit</button>
                  )
                }

                <button
                  type="button"
                  onClick={() => dispatch(deleteItem(item))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default App