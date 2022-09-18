
import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie(){
    const[Veggie,setVeggie]=useState([]);
     useEffect(()=>{
        getVeggie();
     },[]);
     const getVeggie=async()=>{
        const check=localStorage.getItem(Veggie);
        if(check){
            setVeggie(JSON.parse(check));
        }
        else
        {
            const api=await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=9deff0526261447eb76f0778191161ff&number=9&tags=vegetarian`
                );
                const data=await api.json();
                localStorage.setItem("veggie", JSON.stringify(data.recipes));
                setVeggie(data.recipes);
        }
     }
     return(
        <div>
        <Wrapper>                     
        <h1>Veggie Picks</h1>
        <Splide options={{
            perPage:3
        }}>            
        {Veggie.map((recipe)=>{
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
min-height:25rem;

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
export default Veggie;