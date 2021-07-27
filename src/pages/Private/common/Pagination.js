import React, {useState} from 'react'

export default function Pagination(props) {
    const {handelPagination} = props;
    const [page, setPage] = useState(1);

    const changePage = (value) => {
        if (value === 'nxt') {
            setPage(page + 1);
            handelPagination(page + 1);
        } else {
            if (page > 1) {
                setPage(page -1);
                handelPagination(page - 1);
            }
        }
    }

    return (
        <div className="text-center container">
             <div class="button-effect">
                <button class="effect effect-4 button-3 mr-2 rotate-hover" onClick={() => changePage('pre')}>Previous</button>
                <button class="effect effect-4 button-4" onClick={() => changePage('nxt')}>Next</button>
            </div>
        </div>
    )
}
