interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <main className="auth">
            {children}
        </main>
    )
}

export default AuthLayout;