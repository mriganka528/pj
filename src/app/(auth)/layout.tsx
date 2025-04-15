import { UserPen } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="w-svw h-svh bg-signUP  flex fleex-col md:flex-row flex-col items-center justify-center  ">
      <div className="w-svw md:w-[55%] h-[50%] md:h-full flex flex-col items-center shadow-lg bg-gray-50 rounded-b-[40%] md:rounded-l-[0%] md:rounded-r-[25%] ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-7 md:mt-10 text-center text-gray-700 ">BulletinX</h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-14 md:mt-20 bg-[linear-gradient(116deg,_#222F3D,_#bdc4e5)] bg-clip-text text-transparent ">
          Ready to Power Up BulletinX?
        </h1>
        <div className=" max-[768px]:hidden flex flex-col  my-5 md:mt-20 pl-9">
          <p className=" text-base md:text-2xl text-start mt-5 md:mt-10 text-gray-600">
            Sign up as an Admin and start shaping the information flow.
          </p>
          <p className=" text-base md:text-2xl text-start mt-5 md:mt-10 text-gray-600">
            From managing notices to engaging users — you&apos;re in charge of it all.
          </p>
          <p className=" text-base md:text-2xl text-start mt-5 md:mt-10 text-gray-600">
            Your dashboard is waiting. Let&apos;s build something impactful.
          </p>
        </div>
      </div>
      <div className="md:w-[45%]  h-full flex md:items-center justify-center ">
        <div className=" h-[80%] w-[80%] flex flex-col space-y-5 mt-10 md:mt-0 md:items-center justify-start md:justify-center">
          <h1 className="text-center w-full text-4xl font-bold text-gray-700"> <UserPen className="inline-block h-8 w-8" />  Sign In</h1>
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
