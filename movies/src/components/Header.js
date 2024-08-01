import React, { useState } from 'react'
import {AppBar, Toolbar , Box, Autocomplete, TextField, Tab, Tabs} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
// header we have logo, links,searchbar
const dummyitem = ['kill', 'Black Panter']

export const Header = () => {
  const [value,setValue] = useState(0); // for dynamic value insertion on value for highlighting
  return <AppBar sx={{bgcolor:"#2b2d11"}}> 
    <Toolbar>
        <Box width={'20%'}>
          <MovieIcon/>
             
        </Box>
        <Box width ={'25%'} margin={'auto'}>
          <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={dummyitem.map((option) => option)}
        renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant='standard' {...params} placeholder="Search movies" />}
      />

        </Box>
        <Box display={'flex'}>
          <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
            <Tab label ="Admin" />
            <Tab label ="Movies" />
            <Tab label ="Auth" />


          </Tabs>

        </Box>
        
    </Toolbar>
  </AppBar>
  
}
