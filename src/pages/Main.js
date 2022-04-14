import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import { Grid, Button } from "../elements";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  const is_login = useSelector((state)=> state.user.is_login)
  console.log(is_login)

  React.useEffect(() => {
      dispatch(postActions.getPostDB());

  }, []);

  return (
    <>
      {/* <Grid>
        <Header />
        {post_list.map((p, idx) => {
            //p: 모든 리스트
            if (p.user_info.user_id === user_info?.uid) {
              return (
                <Grid
                  bg="#ffffff"
                  margin="8px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`/detail/${p.id}`);
                  }}
                >
                  <Post key={p.id} {...p} is_me />
                  
                </Grid>
                );
            } else {
              return (
                <Grid
                  key={p.id}
                  bg="#ffffff"
                  margin="8px 0px"
                  _onClick={() => {
                    history.push(`/detail/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
            }
          })}
      </Grid>
      <Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/write");
        }}
      ></Button> */}
      <Header />
      {/* {image} */}
      {post_list.map((p, idx) => {
        return (
          //   <Grid
          //   key={p.id}
          //   bg="#ffffff"
          //   margin="8px 0px"
          //   _onClick={() => {
          //     history.push(`/detail/${p.post_id}`);
          //   }}
          // >
          <Post key={p._id} {...p} />
          // </Grid>
        );
      })}
      {is_login? 
      (<Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/write");
        }}
      ></Button>):(null)
      }
      {/* <Post/> */}
    </>
  );
};

export default Main;
