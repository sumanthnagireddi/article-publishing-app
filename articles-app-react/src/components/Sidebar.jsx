import { Link, NavLink } from "react-router-dom";
function getNavLinkClasses({ isActive, isPending }) {
    const baseClasses =
        "block rounded-lg cursor-pointer px-4 text-gray-500 py-2 text-sm font-medium";
    const activeClasses = "bg-emerald-200 text-emerald-600";
    const pendingClasses = "text-gray-500 bg-gray-300";

    if (isActive) {
        return `${baseClasses} ${activeClasses}`;
    }
    if (isPending) {
        return `${baseClasses} ${pendingClasses}`;
    }
    return baseClasses;
}
export default function Sidebar() {

    return (
        <div className="px-4 py-6 flex flex-col max-h-screen max-w-[20vw] justify-center border-e bg-white">
            <div className="flex-1 py-2 w-full">
                <a className="px-4  block cursor-pointer rounded-lg py-2 bg-emerald-200 text-emerald-600 text-center text-sm font-medium">
                    Publish Blog
                </a>
            </div>
            <ul className="mt-6 space-y-1">
                <li>
                    <NavLink to={"/"} className={getNavLinkClasses}>Home</NavLink>
                </li>
                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <span className="text-sm font-medium"> My Blogs </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <NavLink to={"/me/blogs/published"} className={getNavLinkClasses}>Published</NavLink>
                            </li>

                            <li>
                                <NavLink to={"/me/blogs/drafts"} className={getNavLinkClasses}>Drafts</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/me/blogs/scheduled"} className={getNavLinkClasses}>Scheduled</NavLink>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <NavLink to={"/discover"} className={getNavLinkClasses}>Discover</NavLink>
                </li>

                <li>
                    <NavLink to={"/me/blogs/saved"} className={getNavLinkClasses}>Saved</NavLink>
                </li>

                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <span className="text-sm font-medium"> Account </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <NavLink to={"/me/account"} className={getNavLinkClasses}>Account</NavLink>
                            </li>
                            <li>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg cursor-pointer px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
}
