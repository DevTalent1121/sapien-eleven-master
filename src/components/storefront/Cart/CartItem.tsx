import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button"

//Styles
import styled from '@emotion/styled';

//Types
import { CartItemType } from "../Product"

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItemStyle = styled.div` 
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid grey;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .information, .buttons{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    .buttons button{
        min-width: 45px;
    }

    img{
        max-width: 80px !important;
        object-fit: cover;
        margin-left: 40px;
    }
    `



const CartItem: React.FC<Props> = ({item,addToCart, removeFromCart}) => {

    return(

    <CartItemStyle>
        <div>
        <h3>{item.title}</h3>
        <div className="information">
            <Typography>
                Price: ${item.price}
            </Typography>
            <Typography>
                Total: ${(item.amount * item.price).toFixed(2)}
            </Typography>
        </div>
        <div className="buttons">
            <Button
                size="small"
                disableElevation
                variant="contained"
                onClick={()=>removeFromCart(item.id)}
            >
                -
            </Button>
            <Typography>{item.amount}</Typography>
            <Button
                size="small"
                disableElevation
                variant="contained"
                onClick={()=>addToCart(item)}
            >
                +
            </Button>
        </div>
        </div>
        <img src={item.image} alt={item.title} />
    </CartItemStyle>
    );
}
export default CartItem;