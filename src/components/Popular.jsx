import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import Recipe from "../pages/Recipe";


function Popular(){
    const[Popular, SetPopular]=useState([]);
    useEffect(()=>{
      getPopular();
    },[]);
    const getPopular=async()=>{
        const check=localStorage.getItem("popular");
        if(check){
            SetPopular(JSON.parse(check));
        }
        else{
            const api=await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=9deff0526261447eb76f0778191161ff&number=20`
                );
               const data= await api.json();
               localStorage.setItem("popular", JSON.stringify(data.recipes));
               SetPopular(data.recipes);
        }


        
    }
    return(
        <div>
        <Wrapper>                     
        <h1>Popular Picks</h1>
        <Splide options={{
            perPage:4
        }}>            
        {Popular.map((recipe)=>{
            return(
                <SplideSlide key={recipe.id}>
                <Card>                
                <Link to={'/recipe/'+recipe.id} >    
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title}/>   
                    </Link>               
                </Card>
        </SplideSlide>                    
            );            
        })}         
        </Splide>         
    </Wrapper>  
    </div>         
    );  
}

const Wrapper=styled.div`
margin:4rem 0rem;

`;
const Card=styled.div`
min-height:20rem;
width:20rem;
border-radius: 2rem;
overflow: hidden;
position:relative;

img{   
    border-radius: 2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
}

p{    
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform:translate(-50%, 0%);
    color:white;
    width:100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
}
`;





export default Popular;