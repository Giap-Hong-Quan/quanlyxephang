import { useState } from "react"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/authQuery";
import { queryClient } from "../libs/queryClient";
const FormLogin = () => {
  // Khởi tạo điều hiếu của router-dom
  const navigate =useNavigate();
  // gọi reactQuery của api login 
  const loginMutation=useLogin();
  // khai báo trang thái
  const [email,setEmail]= useState<string>("");
  const [password,setPassword]= useState<string>("");
  // hàm submit login
  const onSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    try {
        await loginMutation.mutateAsync({email,password});
        queryClient.invalidateQueries({queryKey:["profile"]});
        toast.success("Đăng nhập thành công");
        navigate("/"); 
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
  return (
    <div className="">
      <form action="" onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[16px]" htmlFor="email">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} className="border w-full py-1.5 pl-1.5 rounded-md " type="text" name="email" id="email" placeholder="example@gmail.com"/>
        </div>
         <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="text-[16px]" htmlFor="password">Mật khẩu</label>
          <input onChange={(e)=>setPassword(e.target.value)} className="border w-full py-1.5 pl-1.5 rounded-md " type="password" name="password" id="password" placeholder="abcxyz123"/>
        </div>
        <button type="submit" className="text-[ff9f2a] border w-fit py-2 px-5 rounded-md">login</button>
      </form>
    </div>
  )
}

export default FormLogin