import CartItem from './CartItem';

// @mui imports
import styled from '@mui/material/styles/styled';
import { Box } from '@mui/material';


// Types
import { CartItemType } from '../Product';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems,addToCart, removeFromCart}) =>{
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack:number, item)=> ack + item.amount * item. price, 0)
    return(
        <Box width={300} p={2}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length ===0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item=>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems)}</h2>
        </Box>


    );
}

export default Cart;