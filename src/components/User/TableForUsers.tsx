import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { usertype } from './usertype';

interface Props{
  setUserdata :  React.Dispatch<React.SetStateAction<usertype[]>> ;
  userdata: usertype[];
}

const TableForUsers:React.FC<Props> = ({setUserdata,userdata}) => {
  const [localData, setLocaldata] = useState<[]>([])
  const [editname, setEditname] = useState<string>('')
  const [editonchagename, setEditonchagename] = useState<string>('')


  const handleEdit = (name:string) => {
    setEditname(name)
  }

  // Update the user data
  const handleeditsubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newuser = userdata.map(num => {
      if (num.name == editname) {
        num.name = editonchagename
        return num
      } return num
    })
    setEditname('')
  }

  // Delete the user data
  const handleDelete = (name:string)=>{
    const newdata  =userdata.filter((val,num)=>{
        return val.name!=name
    })
    setUserdata(newdata)
    alert("User Deleted")
  }

  // Constructing Table columns
  const columns = [
    {
      name: 'Name',
      selector: (row:any) => <div >
        {row.name != editname ? <span className='font-bold'>{row.name}<br />{row.email}</span> :
          <form onSubmit={handleeditsubmit} className='font-bold '>
            <input onChange={e => setEditonchagename(e.target.value)} type='text' className='block w-full p-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
            <button type='submit' className='block material-icons save'>Save</button>
          </form>
        }
      </div>,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row:any) => <span className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${row.status=='Active'?'bg-green-400':'bg-gray-400'}`}>{row.status ? row.status : 'Invited'}</span>,
      sortable: true,
    },
    {
      name: 'Role',
      cell:  (row:any) => {
        if (row.role) {
          return row.role
        } else {
          return 'Software Developer'
        }
      },
      sortable: true,
    }
    , {
      name: 'Last Login',
      selector: (row:any) => {
        if (row.lastlogin) {
          return row.lastlogin
        } else {
          const start = new Date(2022, 0, 1)
          const end  = new Date()
          return `${new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleTimeString()}`
        }
      },
      sortable: true,
    },
    {
      name: '',
      cell: (row:any) => <div>
        <button onClick={() => handleEdit(row.name)} type='button' className="material-symbols-outlined mr-7 text-lg hover:text-blue-500">
          edit
        </button>
        <button onClick={()=>handleDelete(row.name)} type='button' className="material-symbols-outlined text-lg hover:text-red-500">
          delete
        </button>
      </div>
    }
  ]
  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };


  return (
    // Used react data table
    <DataTable columns={columns} data={userdata} pagination paginationComponentOptions={paginationComponentOptions} fixedHeader selectableRows highlightOnHover />
  )
}

export default TableForUsers
