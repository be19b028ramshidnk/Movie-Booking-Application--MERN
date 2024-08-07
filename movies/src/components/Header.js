import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import {AppBar, Toolbar , Box, TextField, Tab, Tabs, IconButton} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
// header we have logo, links,searchbar

export const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
    }, []);


  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d12" }}>
      <Toolbar>
        <Box  color="red"  width={"20%"}>
          <IconButton  LinkComponent={Link} to="/">
            <MovieIcon  />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Acroos Multiple Movies"
              />
            )}
          />
        </Box>
        <Box display={'flex'}>
          <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
          <Tab LinkComponent={Link} to ="/movies" label ="Movies" />
            <Tab LinkComponent={Link} to ="/admin" label ="Admin" />
            <Tab LinkComponent={Link} to ="/auth" label ="Auth" />


          </Tabs>

        </Box>
        
    </Toolbar>
  </AppBar>



)}
