import React from "react";
import Post from "../components/Post";

const Detail = (props) => {
    return (
        <React.Fragment>
            <div>
                헤더
            </div>
            <Post />
            <div>close</div>
        </React.Fragment>
    )
}

export default Detail;