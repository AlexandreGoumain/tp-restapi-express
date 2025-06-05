import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface LoginFormProps {
    className?: string;
    onLogin: (email: string, password: string) => Promise<void>;
    isLoading?: boolean;
}

export function LoginForm({
    className,
    onLogin,
    isLoading = false,
    ...props
}: LoginFormProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'>) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onLogin(formData.email, formData.password);
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>Connexion</CardTitle>
                    <CardDescription>
                        Connectez-vous avec votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-6'>
                            <div className='grid gap-6'>
                                <div className='grid gap-3'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='exemple@email.com'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <div className='flex items-center'>
                                        <Label htmlFor='password'>
                                            Mot de passe
                                        </Label>
                                    </div>
                                    <Input
                                        id='password'
                                        type='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='********'
                                        required
                                    />
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Connexion en cours...'
                                        : 'Se connecter'}
                                </Button>
                            </div>
                            <div className='text-center text-sm'>
                                Vous n&apos;avez pas de compte?{' '}
                                <a
                                    href='#'
                                    className='underline underline-offset-4'
                                >
                                    S&apos;inscrire
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
                By clicking continue, you agree to our{' '}
                <a href='#'>Terms of Service</a> and{' '}
                <a href='#'>Privacy Policy</a>.
            </div>
        </div>
    );
}
