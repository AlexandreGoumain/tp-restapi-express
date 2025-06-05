import { useGetSpotById } from '@/hooks';
import { formatDate } from '@/utils';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function SpotDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetSpotById(id!);

    if (isLoading) {
        return <LoaderCircle className='animate-spin' size={100} />;
    }
    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div>
            <h1>SpotDetails - id - {id}</h1>
            <p>Address: {data?.data.address}</p>
            <p>Description: {data?.data.description}</p>
            <p>CreatedAt: {formatDate(data?.data.createdAt)}</p>
            <p>ModifiedAt: {formatDate(data?.data.modifiedAt)}</p>
            <p>User: {data?.data.user.username}</p>
        </div>
    );
}
