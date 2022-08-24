import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent, makeStyles, Box } from '@material-ui/core';

//this is the matetial ui css
const useStyle = makeStyles({
    container: {
        padding: 15
    },
    cardContainer: {
        padding: 10,
        height: 400
    },
    title: {
        fontSize: 16,
        fontFamily: "poppins",
        textAlign: "center",
        padding: 6,
        height: 30
    },
    price: {
        fontWeight: 600,
        paddingTop: 10
    },
    imageStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});


//this is the home component i.e. all the product displayed on this page after fetching data from api
const Home = () => {
    const classes = useStyle();
    const [product, setProduct] = useState([]);


    //here i have used async await to handle promises to fetch data from api
    const getData = async () => {
        const response = await fetch("https://api.facthunt.in/fostergem/v1/post/list/public");
        var data = await response.json();
        setProduct(data.content);
    };


    //here i have used useEffect to get the data of all products when the page is refreshed
    useEffect(() => {
        getData();
    }, []);
    return (<>
        <Grid container>
            {
                product.map((item) => {
                    return (<>
                        <Grid item xs={12} md={3} className={classes.container}>
                            <Card sx={{ maxWidth: 345 }} className={classes.cardContainer}>
                                <Box className={classes.imageStyle}>
                                    <img src={item.user.profilePic} alt={item.postId} style={{ cursor: "pointer", height: "170px", width: "170px",borderRadius:"50%" }} />
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" className={classes.title}>
                                        {item.user.fname}  {item.user.lname}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" className={classes.title}>
                                        {item.user.bio}
                                    </Typography>
                                </CardContent>
                                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 20px 0px 20px" }}>
                                    <Typography variant="body2" color="text.secondary" className={classes.price}>
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </>)
                })
            }
        </Grid>
    </>)
};
export { Home };