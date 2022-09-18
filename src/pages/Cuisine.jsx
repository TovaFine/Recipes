import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {Link, useParams} from "react-router-dom";
import Recipe  from "./Recipe";


function Cuisine(){

const[cuisine, SetCuisine]=useState([]);

let params=useParams();
useEffect(()=>{
    getCuisine(params.type);
  },[params.type]);

const getCuisine=async(name)=>{ 
        const data=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9deff0526261447eb76f0778191161ff&cuisine=${name}`);
        const recipes=await data.json();
        //localStorage.SetCuisine('Cuisine',JSON.stringify(data.recipes))
        SetCuisine(recipes.results)    
}




    return(
<Grid
animate={{opacity:1}}
initial={{opacity:0}}
exit={{opacity:0}}
transition={{duration:0.5}}
>
    {cuisine.map((item)=>{
        return(
        <Card key={item.id}>
            <Link to={'/recipe/'+item.id}>
            <img src={item.image} alt=""/>
            <h4>{item.title}</h4>
            </Link>
        </Card>
        );
    })}
    </Grid>        
    );
}
const Grid=styled(motion.div)`
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
export default Cuisine;