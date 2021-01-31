import React, {useState} from 'react'

export default function QuantityInput(props) {
    const {total, productId, handelQuantuty} = props;

    const [value, setValue] = useState(total);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10);

    const decriesValue = () => {
        if (value > minValue) {
            setValue(value -1);
            handelQuantuty({qun: value - 1, productId: productId});
        }
    }

    const incriseValue = () => {
        if (value < maxValue) {
            setValue(value + 1);
            handelQuantuty({qun: value + 1, productId: productId});
        }
    }

    return (
        <div className="qty-input">
            <button className="qty-count qty-count--minus" data-action="minus" type="button" onClick={decriesValue}
                disabled={minValue >= value ? 1 : 0 }>-</button>
            <input className="product-qty" type="number" name="product-qty" 
                min={minValue} max={maxValue} value={value}/>
            <button className="qty-count qty-count--add" data-action="add" onClick={incriseValue} type="button"
                disabled={maxValue <= value ? 1 : 0 }>+</button>
        </div>
    )
}
