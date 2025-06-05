import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function HomePage() {
    return (
        <div className='space-y-6'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                    HOME PAGE - API REST Express
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Bienvenue Diyaeddine !
                </p>
                <p>n'hésite pas à explorer le site et à laisser ton avis :)</p>
            </div>

            <Card className='max-w-4xl mx-auto mb-6'>
                <CardHeader>
                    <div className='flex justify-center items-center'>
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqABT02OPbzQoohEkYrc48VxTbvqKm4-8FA&s'
                            alt='logo'
                            className='w-auto h-auto rounded-xl'
                        />
                    </div>
                    <div className='flex flex-col items-center'>
                        <CardTitle>Spots</CardTitle>
                        <CardDescription>
                            Explorez et partagez vos bancs !
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className='mb-4 text-gray-700'>
                        Une application permettant aux utilisateurs de consulter
                        une liste de spots, d'en visualiser les détails, de
                        laisser son avis et d'en ajouter de nouveaux.
                        Connectez-vous pour accéder à des fonctionnalités
                        personnalisées.
                    </p>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                        <div className='bg-blue-50 p-3 rounded-lg text-center'>
                            <div className='font-medium'>Consulter</div>
                            <div className='text-sm text-gray-600'>
                                Spots disponibles
                            </div>
                        </div>
                        <div className='bg-green-50 p-3 rounded-lg text-center'>
                            <div className='font-medium'>Créer</div>
                            <div className='text-sm text-gray-600'>
                                Nouveaux spots
                            </div>
                        </div>
                        <div className='bg-purple-50 p-3 rounded-lg text-center'>
                            <div className='font-medium'>Connexion</div>
                            <div className='text-sm text-gray-600'>
                                Compte utilisateur
                            </div>
                        </div>
                        <div className='bg-amber-50 p-3 rounded-lg text-center'>
                            <div className='font-medium'>Profil</div>
                            <div className='text-sm text-gray-600'>
                                Gérer vos spots et vos avis
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
