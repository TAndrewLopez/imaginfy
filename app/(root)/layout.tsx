import { MobileNav } from "@/components/shared/mobileNav";
import { Sidebar } from "@/components/shared/sidebar";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <main className="root">
            <Sidebar />
            <MobileNav />
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default RootLayout;