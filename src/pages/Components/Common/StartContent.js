import React, {useEffect, useState} from 'react'

export default function StartContent({product}) {

    const [rating, setRating] = useState(0)

    useEffect(() => {
        if (product) {
            let rating = (product.totalRating * 5) / (product.givenByRating * 5);

            if (rating) setRating(rating);
        }
    }, [])
    return (
        <div class="product-start">
            <div class="bg-light border">
                <div id="starrate" class="starrate my-2 text-center" data-val="2.5" data-max="5">
                    <span class="ctrl"></span>
                    <span class="cont m-1">
                    {/* <i class="fas fa-fw fa-star mr-2"></i> 
                    <i class="fas fa-fw fa-star  mr-2"></i> 
                    <i class="fas fa-fw fa-star-half-alt mr-2"></i> 
                    <i class="far fa-fw fa-star mr-2"></i> 
                    <i class="far fa-fw fa-star mr-2"></i>  */}
                        {
                            [...Array(5)].map((n, i) => { 
                                return rating >= i+1 ? 
                                <i class="fas fa-fw fa-star mr-2 brand-color"></i> : 
                                <i class="far fa-fw fa-star mr-2"></i>
                            })
                        }
                    </span>
                </div>              
            </div>                
        </div>
    )
}
