import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSpots } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export default function SpotsList() {
    const { data, isLoading, isError, error } = useGetSpots();
    const spots = data?.data || [];
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Chargement des spots...</h2>
                <div className='grid gap-4'>
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className='animate-pulse'>
                            <CardHeader>
                                <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                            </CardHeader>
                            <CardContent>
                                <div className='h-4 bg-gray-200 rounded mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                <p>
                    Erreur:{' '}
                    {error instanceof Error
                        ? error.message
                        : "Une erreur s'est produite"}
                </p>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Liste des spots</h2>
                <Button onClick={() => navigate('/spots/new')}>
                    Nouveau spot
                </Button>
            </div>

            {spots.length === 0 ? (
                <div className='text-center p-8 border rounded-lg'>
                    <p className='text-gray-500'>Aucun spot trouvé.</p>
                </div>
            ) : (
                <div className='grid gap-4'>
                    {spots.map(spot => (
                        <Card key={spot.id}>
                            <CardHeader>
                                <CardTitle className='text-xl'>
                                    {spot.description}
                                </CardTitle>
                                <p className='text-sm text-gray-500'>
                                    Par {spot.user.username}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className='line-clamp-2'>{spot.address}</p>
                                <div className='mt-4'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() =>
                                            navigate(`/spots/${spot.id}`)
                                        }
                                    >
                                        Lire la suite
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
