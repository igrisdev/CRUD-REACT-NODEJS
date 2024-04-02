import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Record = (props) => {
  return (
    <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
      <td className='px-4 py-2 text-left align-middle [&amp;:has([role:checkbox])]:pr-0'>
        {props.record.name}
      </td>
      <td className='px-4 py-2 text-left align-middle [&amp;:has([role:checkbox])]:pr-0'>
        {props.record.position}
      </td>
      <td className='px-4 py-2 text-left align-middle [&amp;:has([role:checkbox])]:pr-0'>
        {props.record.level}
      </td>
      <td className='px-4 py-2 text-left align-middle [&amp;:has([role:checkbox])]:pr-0'>
        <div className='flex gap-2'>
          <Link
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9
            rounded-md px-3'
            to={`/edit/${props.record._id}`}
          >
            Edit
          </Link>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9
            rounded-md px-3'
            color='red'
            type='button'
            onClick={() => {
              props.deleteRecord(props.record._id)
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function RecordList() {
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  // este hook se ejecuta cuando el componente se monta y recupera los registros
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`)

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const records = await response.json()
      setRecords(records)
      setFiltered(records)
    }

    getRecords()
    return
  }, [records.length])

  useEffect(() => {
    const filtered = records.filter((record) => {
      return record.name.toLowerCase().includes(search.toLowerCase())
    })

    if (search === '') {
      setFiltered(records)
    }

    setFiltered(filtered)
  }, [search])

  function searchEmployees(event) {
    setSearch(event.target.value)
  }

  // este método elimina un registro de la base de datos.
  async function deleteRecord(id) {
    const res = await fetch(`http://localhost:5050/record/${id}`, {
      method: 'DELETE',
    })

    const newRecords = records.filter((el) => el._id !== id)
    setRecords(newRecords)
  }

  // este método listara los registros
  function recordList() {
    return filtered.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      )
    })
  }

  // esta sección mostrara los registros en una tabla
  return (
    <>
      <section className='flex flex-col mb-4 sm:flex-row sm:mb-0 sm:items-center justify-between'>
        <h3 className='text-lg font-semibold py-4 sm:px-4 text-left w-max flex-1'>
          Employee Records
        </h3>
        <div className='flex-1'>
          <input
            type='search'
            name='search'
            id='search'
            defaultValue={search}
            placeholder='Search Employees by Name'
            className='w-full whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3'
            onChange={searchEmployees}
          />
        </div>
      </section>
      <section className='border rounded-lg overflow-hidden'>
        <div className='relative w-full overflow-auto'>
          <table className='w-full caption-bottom overflow-auto'>
            <thead className='[&amp;_tr]:border-b'>
              <tr
                className='border-b transition-colors hover:bg-muted/50
              data-[state=selected]:bg-muted'
              >
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role:checkbox])]:pr-0'>
                  Name
                </th>
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role:checkbox])]:pr-0'>
                  Position
                </th>
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role:checkbox])]:pr-0'>
                  Level
                </th>
                <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role:checkbox])]:pr-0'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='[&amp;_tr:last-child]:border-0'>
              {recordList()}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
