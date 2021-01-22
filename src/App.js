import './App.css'
import { Input, Table } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [dataTable, setDataTable] = useState({ origin: [], temp: [] })
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('https://api.publicapis.org/categories')
        setDataTable({ origin: response.data, temp: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const filterData = dataTable.origin.filter((item) => item.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0)
    setDataTable({ ...dataTable, temp: filterData })
  }, [searchInput])

  return (
    <div className='container'>
      <Input icon='search' placeholder='Search...' onChange={(e) => setSearchInput(e.target.value)} />
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Categories</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataTable.temp &&
            dataTable.temp?.map((item, index) => {
              return (
                <Table.Row key={`item-${index}`}>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{item}</Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default App
