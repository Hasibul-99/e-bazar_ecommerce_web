import React, {useState} from 'react'

export default function QuantityInput() {
    const [value, setValue] = useState(1)
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10);

    const decriesValue = () => {
        if (value > minValue) setValue(value -1);
    }

    const incriseValue = () => {
        if (value < maxValue) setValue(value + 1);
    }

    return (
        <div class="qty-input">
            <button class="qty-count qty-count--minus" data-action="minus" type="button" onClick={decriesValue}
                disabled={minValue >= value ? 1 : 0 }>-</button>
            <input class="product-qty" type="number" name="product-qty" 
                min={minValue} max={maxValue} value={value}/>
            <button class="qty-count qty-count--add" data-action="add" onClick={incriseValue} type="button"
                disabled={maxValue <= value ? 1 : 0 }>+</button>
        </div>
    )
}
