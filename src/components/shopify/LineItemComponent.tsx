import * as React from "react";
import { LineItem } from "shopify-buy";
import {
  decrementQuantity,
  incrementQuantity,
  removeLineItemFromCart,
} from "../../store/shopify/actions";

interface ILineItemProps {
  lineItem: LineItem;
}

export default function LineItemComponent(props: ILineItemProps) {
  const { lineItem } = props;

  return (
    <li className="Line-item">
      <div className="Line-item__img">
        {lineItem.attrs.variant.image ? (
          <img
            src={lineItem.attrs.variant.image.src}
            alt={`${lineItem.title} product shot`}
          />
        ) : null}
      </div>
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <div className="Line-item__variant-title">
            {/* {lineItem.variant.title} */}
            {lineItem.attrs.variant.title}
          </div>
          <span className="Line-item__title">{lineItem.title}</span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button
              className="Line-item__quantity-update"
              onClick={() => decrementQuantity(lineItem)}
            >
              -
            </button>
            <span className="Line-item__quantity">{lineItem.quantity}</span>
            <button
              className="Line-item__quantity-update"
              onClick={() => incrementQuantity(lineItem)}
            >
              +
            </button>
          </div>
          <span className="Line-item__price">
            $ {(lineItem.quantity * parseFloat(JSON.parse(JSON.stringify(lineItem.attrs.variant.price)).amount)).toFixed(2)}
            {/* $ {lineItem.variant.priceV2.amount} */}
          </span>
          <button
            className="Line-item__remove"
            onClick={() => removeLineItemFromCart(lineItem.id)}
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}
