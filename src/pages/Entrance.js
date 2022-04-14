import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import '../shared/App.css';

function Entrance(props) {
  return (
    <div>
       <Img src="img/풀배경.png"/>
       <Btn>
         <EntBTn
          onClick={() => {
            history.push("/main");
          }}
        >
          입장하기
        </EntBTn>
       </Btn>
    </div>
     
  );
}

const Img = styled.img`
  width: 100%;
  position: absolute;
`
const Btn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const EntBTn = styled.button`
  position: relative;
  width: 200px;
  height: 60px;
  margin-top: 35%;
  border: none;
  border-radius: 50px;
  background-color: black;
  color: white;
  font-size: 30px;
  font-family: 'Cafe24Ohsquareair';
`

export default Entrance;
