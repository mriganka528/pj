import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-start sm:items-center h-screen">
      <div className=" sm:border-2 sm:shadow-md sm:rounded-lg flex flex-col p-10 justify-start pt-14 sm:justify-center space-y-8  items-center " >
        <h1 className="text-center text-3xl font-bold">Sign In To BulletinX</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-x-8 ">
          <Image src={"/assets/undraw-login.svg"} className=" h-[10rem] w-[10rem] sm:h[15rem] sm:w-[15rem] md:h-[20rem] md:w-[20rem]" height={300} width={400} alt="Login image" />
          {children}
        </div>
      </div>
    </div>
  );
}
