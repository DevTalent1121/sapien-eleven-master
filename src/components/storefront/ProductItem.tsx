import Button from "@mui/material/Button";

//Types
import { CartItemType } from "./Product";

//Styles
import { Box, Card, CardContent, CardHeader, Divider, styled, Typography } from "@mui/material";

type Props  = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}



const ProductItem: React.FC<Props> = ({item,handleAddToCart}) => (

    <Card elevation={4}>
        <CardHeader
            title={item.title}

        />
        <Divider />
        <CardContent sx={{paddingBottom:'0px !important'}}>
            <Box className="image_div" sx={{width:'100%', height:'200px', backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}}>
            </Box>
            <Typography mt={2}>{item.description}</Typography>
            <Typography mt={2}>${item.price}</Typography>
            <Divider />

            <Button onClick={()=> handleAddToCart(item)} sx={{width:'100%',marginTop:'3px'}}>Add to Cart</Button>
        </CardContent>
    </Card>
)
{/* <Wrapper>
        <img src={item.image} alt={item.title} width={100} height={100} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
        </div>
        <Button onClick={()=> handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper> */}

export default ProductItem;