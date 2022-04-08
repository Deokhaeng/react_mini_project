import React from "react";
import {Grid, Text, Button} from '../elements/index';

const Header = (props) => {
    const {is_login,}=props;

    if(is_login){
        return (
        <React.Fragment>
            <Grid>
                <Grid>
                    <Text>
                        로고..
                    </Text>
                </Grid>
            </Grid>

            <Grid>
                <Button text='로그아웃' margin='2px' />
            </Grid>
        </React.Fragment>
    )
}
    return (
        <React.Fragment>
            <Grid is_flex>
                    <Text>
                        로고..
                    </Text>
            <Grid>
                <Button width='60px' text='로그인' margin='2px'  />
                <Button width='60px' text='회원가입'  margin='2px' />
            </Grid>
            </Grid>
        </React.Fragment>
    )
    
}

Header.defaultProps = {
    is_login : false,
};

export default Header;