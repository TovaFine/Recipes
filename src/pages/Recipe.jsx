import React, {useEffect,useState} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";

function Recipe(){
    const[details, SetDetails]=useState({});
    const[activeTab, SetactiveTab]=useState('instructions');
    let params=useParams();  
    
    const GetDetails= async() => {
        const api=await fetch('https://api.spoonacular.com/recipes/${params.name}/information?apiKey=9deff0526261447eb76f0778191161ff');
        const data=await api.json();
        SetDetails(data);
    };
    
   useEffect=(()=>{
    GetDetails();
    },[params.name]);

return (
<DetailWrapper>
    <div>   
        <h2>{details.title}</h2>
        <img src={details.image}alt=""/>
    </div>
    <Info>
    <Button className={activeTab==="instructions"?"active":""}
    onClick={()=>SetactiveTab("instructions")}
    >Instructions</Button>
    <Button className={activeTab==="ingredients"?"active":""}
    onClick={()=>SetactiveTab("ingredients")}
    >Ingredients</Button>
    {activeTab==="instructions" &&(
        <div>
        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
        <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
    </div>
    )}
    
    
    
    </Info>
</DetailWrapper>
);
}
const DetailWrapper=styled.div`
margin-top:10rem;
margin-bottom:5rem;
display:flex;
.active{
    background:linear-gradient(35deg, #494949, #313131);
    color:white;
}
h2{
    margin-bottom:2rem;
}
li{
    font-size:1.5rem;
    line-height:2.5rem;
}
ul{
    margin-top:2rem;
}
`;
const Button=styled.button`
padding:1rem 2rem;
color:#313131;
background:white;
border:2px solid black;
margin-right:2rem;
font-weight:600;
`;
const Info=styled.div`
margin-left:40rem;
`;


export default Recipe;