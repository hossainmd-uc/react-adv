import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Skeleton } from "./ui/skeleton"
import { useNavigate } from "react-router-dom"

const ItemCard = ({ item }) => {

  const navigate = useNavigate()

  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Reset when the image URL changes (important in lists)
  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
  }, [item?.image])

  return (
    <div>
      <Card onClick={() => navigate(`/item/${item.id}`) }
        className="cursor-pointer max-w-xs overflow-hidden transition-all hover:shadow-md  hover:shadow-md hover:-translate-y-2">
        <CardHeader>
          <CardTitle>{item?.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative h-80 w-full overflow-hidden rounded-md">
            {/* show skeleton until loaded, or if the image fails */}
            {(!imgLoaded || imgError) && <Skeleton className="h-full w-full" />}

            {/* only try to render the img if we have a URL and it hasn't errored */}
            {item?.image && !imgError && (
              <img
                src={item.image}
                alt={item?.name ?? "Item image"}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`h-full w-full object-cover transition-opacity ${imgLoaded ? "opacity-100" : "opacity-0"
                  }`}
              />
            )}
          </div>

          {item?.description && (
            <CardDescription className="mt-2 line-clamp-1 ">
              {item.description}
            </CardDescription>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 font-mono">
          {item?.price_point && <Badge variant="default">{item.price_point}</Badge>}
          {item?.audience && <Badge variant="secondary">{item.audience}</Badge>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ItemCard
