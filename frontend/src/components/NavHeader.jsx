import NavLogo from "./NavLogo";

export default function NavHeader({ setIsModelOpen }) {
    return (
        <header className="w-[890px] mx-auto flex header-nav items-center mt-[21px] justify-between gap-4 rounded-primary px-4 py-2">
            <NavLogo />
            <ul className="flex justify-evenly font-semibold text-[rgba(48,48,48,1)] w-[613px] items-center">
                <li className="cursor-default hover:scale-105 duration-100">
                    Home
                </li>
                <li className="cursor-default hover:scale-105 duration-100">
                    Find Jobs
                </li>
                <li className="cursor-default hover:scale-105 duration-100">
                    Find Talents
                </li>
                <li className="cursor-default hover:scale-105 duration-100">
                    About us
                </li>
                <li className="cursor-default hover:scale-105 duration-100">
                    Testimonials
                </li>
            </ul>
            <button
                onClick={() => setIsModelOpen(true)}
                className="bg-linear-to-t from-purple-start outline-0 py-2 h-[38px] duration-500 w-[123px] text-center hover:-translate-y-1 hover:scale-105  to-purple-end text-white rounded-button "
            >
                Create Jobs
            </button>
        </header>
    );
}
