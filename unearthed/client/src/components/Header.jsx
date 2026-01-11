import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

const Header = () => {

  const navigate = useNavigate()

  return (
    <div className=''>
      <div className="flex items-end justify-between">
        <div className="flex items-end">
          <img src="logo.png" className="h-20 overflow-hidden rounded-md object-cover"></img>
          <span className=" tracking-tight text-xl font-semibold">UnEarthed</span>
        </div>
        <Button onClick={() => navigate('/')} variant="ghost">Home</Button>
      </div>
      <Separator className='my-4' />
    </div>
  )
}

export default Header