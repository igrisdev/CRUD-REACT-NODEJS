import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Record() {
  const [form, setForm] = useState({
    name: '',
    position: '',
    level: '',
  })
  const [isNew, setIsNew] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined
      if (!id) return
      setIsNew(false)
      const response = await fetch(`http://localhost:5050/record/${id}`)
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }
      const record = await response.json()
      if (!record) {
        window.alert(`Record with id ${id} not found`)
        navigate('/')
        return
      }
      setForm(record)
    }
    fetchData()
  }, [params.id, navigate])

  // este método actualizara el registro
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  // este método maneja el envió del formulario con el registro
  async function onSubmit(e) {
    e.preventDefault()
    const person = { ...form }
    try {
      let response
      if (isNew) {
        // si estas añadiendo un nuevo registro, enviaremos un POST a /record
        response = await fetch('http://localhost:5050/record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        })
      } else {
        // si estas actualizando un registro, enviaremos un PUT a /record/:id
        response = await fetch(`http://localhost:5050/record/${person._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        })
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error)
    } finally {
      setForm({ name: '', position: '', level: '' })
      navigate('/')
    }
  }

  // este código pinta el formulario
  return (
    <>
      <h3 className='text-lg font-semibold py-4 sm:px-4 text-left'>
        Create/Update Employed Record
      </h3>
      <form
        onSubmit={onSubmit}
        className='border rounded-lg overflow-hidden p-4'
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2 text-left'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-slate-900'>
              Employee Info
            </h2>
            <p className='mt-1 text-sm leading-6 text-slate-600'>
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-slate-900'
              >
                Name
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='First Last'
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-slate-900'
              >
                Position
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Developer Advocate'
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className='mt-4'>
                <legend className='sr-only'>Position Options</legend>
                <div className='space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0'>
                  <div className='flex items-center'>
                    <input
                      id='positionIntern'
                      name='positionOptions'
                      type='radio'
                      value='Intern'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      checked={form.level === 'Intern'}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor='positionIntern'
                      className='ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4'
                    >
                      Intern
                    </label>
                    <input
                      id='positionJunior'
                      name='positionOptions'
                      type='radio'
                      value='Junior'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      checked={form.level === 'Junior'}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor='positionJunior'
                      className='ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4'
                    >
                      Junior
                    </label>
                    <input
                      id='positionSenior'
                      name='positionOptions'
                      type='radio'
                      value='Senior'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      checked={form.level === 'Senior'}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor='positionSenior'
                      className='ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4'
                    >
                      Senior
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type='submit'
          value='Save Employee Record'
          className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 cursor-pointer mt-4'
        />
      </form>
    </>
  )
}
