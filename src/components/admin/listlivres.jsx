"use client"
import  { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Image from "next/image"
const Listlivres = ({livres}) => {
  const[searchTitre,setsearchTitre]=useState()
  const[livresdata,setLivresData]=useState(livres)
  
  const handlefind = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setsearchTitre(searchTerm);
    setLivresData((prevLivresData) => (
      searchTerm === ''
        ? livres
        : prevLivresData.filter((item) => item.titre && item.titre.toLowerCase().includes(searchTerm))
    ));
  };


  const columns = useMemo(
    () => [
    {
    accessorKey: 'couverture', //access nested data with dot notation
    header: 'Image',
    Cell: ({ cell}) => (
    <Box
    sx={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    }}
    >
    <Image
              src={cell.getValue()}
              alt="livre id"
              height="50"
              width="50"
            />

    
    </Box>),
    },
    {
    accessorKey: 'isbn', //access nested data with dot notation
    header: 'ISBN',
    size: 100,
    },
    {
    accessorKey: 'titre',
    header: 'TITRE',
    size: 100,
    },
    {
      accessorKey: 'annedition',
      header: 'Année Edition',
      size: 100,
      },
    {
    accessorKey: 'prix',
    header: 'Prix',
    size: 100,
    },
    {
    
    accessorKey: 'qtestock',
    header: 'Stock',
    size: 100,
    },
    {
      accessorKey: 'specialites.nomspecialite', //normal accessorKey
      header: 'Spécialité',
      size: 100,
      },
      {
        accessorKey: 'editeurs.maisonedit', //normal accessorKey
        header: 'Editeur',
        size: 100,
        },
    ],
    [livresdata],
    );
return (
<div>
<form class="d-flex" role="search">
  
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>handlefind(e)}/>
  
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
<MaterialReactTable columns={columns} data={livresdata} />;
</div>

  )
}
export default Listlivres
