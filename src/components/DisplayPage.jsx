import React from 'react'
import axios from "axios";

import  TableComponent  from './TableComponent';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function DisplayPage() {
  const [codes, setcodes] = React.useState([]);
  const[loading,setLoading]=React.useState(false);

  
  React.useEffect(() => {
    async function fetchData() {
      axios
      .get("http://localhost:4000/genral")
      .then(({data}) => {
        setLoading(false);
        setcodes(data.data)
    
      },[]);
    }
    fetchData();
    setLoading(true)
  }, []);
  return (
    <>
    <Box sx={{width:'100vw',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    
    <TableComponent loading={loading} codes={codes}/>
    </Box>
   
    </>
  )
}
