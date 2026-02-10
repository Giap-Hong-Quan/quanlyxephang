import {ChevronRight,Bell} from "lucide-react"
import { useHeaderStore } from "../store/useHeaderStore"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../hooks/authQuery";

const Header = () => {
  const navigate =useNavigate();
  const title = useHeaderStore((state)=>state.title)
  const subTitle = useHeaderStore((state)=>state.subTitle)
  const {data,isLoading} =useProfile();
if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex h-[70px] items-center justify-between w-full ">
      <div className="flex items-center gap-1 text-xl font-medium">
        <p className={!subTitle?'text-[#FF7506]':"text-[#7E7D88]"}>{title}</p>
        {subTitle&&
        <>
        <ChevronRight size={16} color="#7E7D88" />
        <p className="text-[#FF7506]">{subTitle}</p>
        </>
        }
      </div>
      <div className="flex items-center cursor-pointer gap-4 h-full pr-9">
        <Bell className="bg-[#FFF2E7] text-[#FF7506] rounded-[50%]" />
        <div onClick={()=>navigate("/profile")} className="flex gap-1.5 h-[60%] items-center">
          <img src={data?.data?.avatar_url} alt=""  className="h-full object-cover rounded-[50%] "/>
          <div>
            <p className="text-[#7E7D88] text-sm">Xin chào</p>
            <p className="text-[#535261] font-medium">{data?.data?.full_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header