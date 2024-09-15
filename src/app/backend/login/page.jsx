'use client'
import '../ui/plugins/fontawesome-free/css/all.min.css'
import '../ui/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../ui/css/adminlte.min.css'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const data = {
            email,
            password
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const responseData = await response.json();
            toast.success(responseData.message);
            localStorage.setItem("auth_token", responseData.data.token);
            localStorage.setItem("user_details", JSON.stringify(responseData.data.user));
            router.push('/backend/dashboard', { scroll: false });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className='hold-transition login-page'>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Crypto</b>Blog</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form method="post" onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" name='email' className="form-control" placeholder="Email" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" name='password' className="form-control" placeholder="Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" disabled={isLoading} className="btn btn-primary btn-block">
                                            {isLoading ? 'Verifying credentials...' : 'Sign In'}
                                        </button>
                                    </div>
                                </div>
                                <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
