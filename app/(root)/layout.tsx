interface AuthLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <main className="root">
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default RootLayout;