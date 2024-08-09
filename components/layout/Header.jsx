import Logo from "../ui/Logo";
import { FaUserAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import Search from "../ui/Search";
import { GiHamburgerMenu } from "react-icons/Gi";
import { AiOutlineClose } from "react-icons/Ai";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [IsSearchModal, setIsSearchModal] = useState(false);
  const [IsBurgerModal, setIsBurgerModal] = useState(false);
  const router = useRouter();

  return (
    <div className=" h-[5rem] sticky top-0 z-40 bg-secondary">
      <div className="container mx-auto text-white flex justify-between h-full items-center ">
        <Logo />
        <nav
          className={`sm:static absolute sm:w-auto sm:h-auto
        top-0 left-0  h-screen w-full sm:flex hidden 
         sm:text-white sm:bg-transparent bg-white text-black 
         ${IsBurgerModal === true && " !grid place-content-center"}`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li
              className={`px-[0.3rem] py-[1.25rem] font-Roboto sm:hover:bg-slate-700 hover:bg-none sm:rounded-lg rounded-none sm:transition-all transition-none cursor-pointer ${
                router.asPath === "/" ? "text-white " : "opacity-50"
              } `}
            >
              <Link href="/">AnaSayfa</Link>
            </li>
            <li
              className={`px-[0.3rem] py-[1.25rem] font-Roboto sm:hover:bg-slate-700 sm:rounded-lg sm:transition-all cursor-pointer ${
                router.asPath === "/menu" ? "text-white " : "opacity-50"
              }`}
            >
              <Link href="/menu">Menü</Link>
            </li>
            <li
              className={`px-[0.3rem] py-[1.25rem] font-Roboto sm:hover:bg-slate-700 sm:rounded-lg sm:transition-all cursor-pointer ${
                router.asPath === "/about" ? "text-white " : "opacity-50"
              }`}
            >
              <Link href="/about">Hakkımızda</Link>
            </li>
            <li
              className={`px-[0.3rem] py-[1.25rem] font-Roboto sm:hover:bg-slate-700 sm:rounded-lg sm:transition-all cursor-pointer ${
                router.asPath === "/reservation" ? "text-white " : "opacity-50"
              }`}
            >
              <Link href="/reservation">Rezervasyon</Link>
            </li>
          </ul>
          {IsBurgerModal && (
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsBurgerModal(false)}
            >
              <AiOutlineClose
                size={20}
                className="hover:text-primary transition-all"
              />
            </button>
          )}
        </nav>
        <div className="flex gap-x-5 items-center sm:mr-0 mr-3">
          <Link className="" href="/auth/login">
            <FaUserAlt className="hover:text-primary transition-all" />
          </Link>
          <Link href="/cart">
            <FaShoppingCart className="hover:text-primary transition-all" />
          </Link>
          <a href="#">
            <button onClick={() => setIsSearchModal(true)}>
              <FaSearch className="hover:text-primary transition-all" />
            </button>
          </a>
          <a href="#" className="md:inline-block hidden">
            <button className="btn-primary">Order Online</button>
          </a>
          <button>
            <GiHamburgerMenu
              onClick={() => setIsBurgerModal(true)}
              className="text-xl sm:hidden inline-block hover:text-primary transition-all"
            />
          </button>
        </div>
      </div>
      {IsSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
