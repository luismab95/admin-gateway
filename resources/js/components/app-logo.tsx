import AppLogoIcon from "./app-logo-icon";

export default function AppLogo() {
    return (
        <>
            {/* <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>

            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-white">Gateway</span>
            </div> */}

            <div className="flex aspect-square size-36 fill-current items-center justify-center rounded-md">
                <img src="/logo.png" className="w-auto h-auto object-contain mx-auto" alt="Logo Gateway" />
            </div>
        </>
    );
}
