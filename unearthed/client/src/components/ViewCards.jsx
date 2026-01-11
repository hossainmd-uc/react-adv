import React, { useEffect, useState } from 'react'
import ItemCard from './Card'


const ViewCards = () => {

    const [data, setData] = useState([])

    async function getData() {

        const response = await fetch('/gifts')
        setData(await response.json())

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
        <h1 className='text-left p-3'>Shop</h1>
            <div className='min-h-screen grid gap-4 grid-cols-3'>
                {data && data.map((item, i) => {
                    return <ItemCard key={'card' + i} item={item} />
                })}
            </div>
        </>
    )
}

export default ViewCards