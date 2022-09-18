import React from "react";
import{useState, useEffect} from "react"
import { Params, useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched(){
const[searchRecipe, SetSearchRecipe]=useState([]);
let params=useParams();

    const getSearched=async(name)=>{
        const api=await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=9deff0526261447eb76f0778191161ff&query=${name}`
        )
        const data=await api.json();
        SetSearchRecipe(data.results)
        };
     
        useEffect(()=>{
            getSearched(params.search);        
         },[params.search]);

    return <Grid>
        {searchRecipe.map((item)=>{
            return(
            <Card key={item.id}>
                <Link to={'/recipe/'+item.id} >  
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
                </Link>
            </Card>
            )         
        })}
    </Grid>;
    
}
const Grid=styled.div`
display:grid;
grid-template-columns:repeat(auto-fit, minmax(20rem, 1fr));
grid-gap:3rem;
`;
const Card=styled.div`
img{
    width:100%;
    border-radius:2rem;
}
a{
    text-decoration:none;
}
h4{
    text-align:center;
    padding:1rem;
}
`;
export default Searched;