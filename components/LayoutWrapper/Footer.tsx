import Image from "next/image";

const Footer = () => (
  <div className="flex flex-col my-10 px-10">
    <div className="flex items-center ml-auto">
      {/* <label className="text-xs font-mono text-gray-400 mr-1">
        Designed & developed by
      </label> */}
      <div className="cursor-pointer hover:scale-110">
        <Image
          src="/images/icon-greek.gif"
          width={24}
          height={24}
          layout="fixed"
          alt="icon-greek"
        />
      </div>
    </div>
  </div>
);

export default Footer;
