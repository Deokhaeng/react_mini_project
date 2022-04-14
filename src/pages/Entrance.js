import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { history } from "../redux/configureStore";

function Entrance(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "90vh",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "50vh",
            height: "50vh",
            backgroundColor: "#dddddd",
            display: "flex",
          }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
            }}
          >
            <p>랜선 떡볶이단</p>
            <Button
              _onClick={() => {
                history.push("/main");
              }}
            >
              입장하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Entrance;
