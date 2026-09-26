import React from 'react';
interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}
interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}
export declare const AuthContext: React.Context<AuthContextValue | null>;
export declare function AuthProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
//# sourceMappingURL=AuthContext.d.ts.map