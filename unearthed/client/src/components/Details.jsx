import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

const Details = () => {

    const [errorLoading, setErrorLoading] = useState(false)

    const params = useParams()
    const itemId = params.itemId

    const [data, setData] = useState({})

    async function getData() {

        const response = await fetch(`/gifts/${itemId}`)
        const parsed = await response.json()
        // const filtered = parsed.find((item) => item.id === Number(itemId))


        setData(parsed)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='w-5xl flex gap-4 items-stretch'>
            <div className=' shrink-0'>
                <p className='text-xl tracking-tight p-2 font-light'>{data.name}</p>
                {errorLoading && (<Skeleton className='h-150 w-[600px]' />)}
                {!errorLoading && (<img className='w-[600px] h-150 object-cover rounded-xs' src={data.image} onError={() => setErrorLoading(true)}></img>)}
            </div>
            <div className='flex flex-col text-left justify-around'>
                <div>
                    <div className='flex gap-2'>
                        <Button size='sm' variant='secondary' className='tracking-wider max-w-24'>Description</Button>
                        {/* <Separator className='h-8 bg-foreground/20 ' orientation='vertical' /> */}
                        <Button size='sm' variant='secondary'>{data.price_point}</Button>
                    </div>
                    <p className='p-2'>{data.description}</p>
                </div>
                <div className='flex gap-2'>
                    <Button size='sm' variant='secondary' className='tracking-wider'>For: </Button>
                    <Badge>{data.audience}</Badge>
                </div>
            </div>
        </div >
    )
}

export default Details